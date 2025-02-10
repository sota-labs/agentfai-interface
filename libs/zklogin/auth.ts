import { SuiClient } from '@mysten/sui/client';
import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  jwtToAddress,
} from '@mysten/sui/zklogin';
import retry from 'async-retry';
import { jwtDecode } from 'jwt-decode';
import config from '@/config';
import rf from '@/services/RequestFactory';
import { GoogleIdTokenPayload, ZkProofParams } from './type';
import { Storage } from '@/libs/storage';

const clientId = config.googleClientId;
const suiProverUrl = config.zkProofUrl || 'https://zklogin-prover-sui.sotalabs.io/v1';
// const suiProverUrl = 'https://zklogin-prover-fe.fly.dev/v1';

export const getEd25519PublicKey = (ephemeralPrivateKey: string) => {
  const keyPair = decodeSuiPrivateKey(ephemeralPrivateKey);
  const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(keyPair.secretKey);
  return ephemeralKeyPair.getPublicKey();
};

export const getMaxEpoch = async (rpcUrl: string) => {
  const suiClient = new SuiClient({ url: rpcUrl });
  const { epoch } = await retry(
    async () => {
      return await suiClient.getLatestSuiSystemState();
    },
    {
      retries: 3,
      minTimeout: 1000,
      maxTimeout: 3000,
      onRetry: (error, attempt) => {
        console.warn(`Failed to get latest sui system state (attempt ${attempt}):`, error);
      },
    }
  );
  return Number(epoch) + config.suiEpochTime;
};

export const getZkLoginUrl = async (
  callbackUri: string,
  redirectAfterLogin?: string,
) => {
  const maxEpoch = await getMaxEpoch(config.rpcUrl);
  const ephemeralKeyPair = Ed25519Keypair.generate();
  const jwtRandomness = generateRandomness();
  const nonce = generateNonce(
    ephemeralKeyPair.getPublicKey(),
    maxEpoch,
    jwtRandomness,
  );
  Storage.setZkLoginForGuest({
    maxEpoch,
    jwtRandomness,
    ephemeralPrivateKey: ephemeralKeyPair.getSecretKey(),
  });
  const params = new URLSearchParams();
  params.set('redirect_uri', callbackUri);
  params.set('nonce', nonce);
  params.set('response_type', 'id_token token');
  params.set('client_id', clientId || '');
  params.set('scope', 'email profile openid');
  params.set('prompt', 'consent');
  if (redirectAfterLogin) {
    params.set('state', btoa(redirectAfterLogin));
  }

  console.log('params', params.toString());
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export const decodeIdToken = async (
  idToken: string,
): Promise<GoogleIdTokenPayload> => {
  const res = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
  );

  const data = await res.json();

  if (!res.ok) {
    if (data.error === 'invalid_token') console.error('Invalid Token');
    else {
      throw new Error(
        `[decodeIdToken] Failed (${res.status}): ${JSON.stringify(data)}`,
      );
    }
  }
  return data;
};

export const fetchZkProof = async (props: ZkProofParams): Promise<any> => {
  const response = await fetch(suiProverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...props, keyClaimName: 'sub' }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error fetching ZKProof ${response.status}: ${JSON.stringify(data)}`,
    );
  }

  return data;
};

export const generateZkpData = async (
  jwt: string,
  salt: string,
  ephemeralPrivateKey: string,
  maxEpoch: string,
  jwtRandomness: string,
) => {
  const jwtPayload = await decodeIdToken(jwt);
  if (!jwtPayload.sub || !jwtPayload.aud) {
    console.error('missing jwt.sub or jwt.aud');
  }
  console.log('[generateZkpData] salt:', salt);
  // const salt = '190441132428073873548947078596638994222';
  const zkAddress = jwtToAddress(jwt, salt);
  console.log('[generateZkpData] zkAddress:', zkAddress);
  console.log('[generateZkpData] key:', `auth.zkLogin`);
  console.log('[generateZkpData] key:', {
    maxEpoch,
    jwtRandomness,
    ephemeralPrivateKey,
  });

  const ephemeralPublicKey = getEd25519PublicKey(ephemeralPrivateKey);
  const extendedEphemeralPublicKey =
    getExtendedEphemeralPublicKey(ephemeralPublicKey);

  const zkProof = await fetchZkProof({
    maxEpoch: +maxEpoch,
    jwtRandomness,
    extendedEphemeralPublicKey,
    jwt,
    salt,
  });

  console.log('[generateZkpData] zkProof:', zkProof);

  const addressSeed: string = genAddressSeed(
    BigInt(salt!),
    'sub',
    jwtPayload.sub,
    jwtPayload.aud,
  ).toString();
  console.log('[generateZkpData] addressSeed:', addressSeed);

  return {
    zkProof,
    zkAddress,
    ephemeralPrivateKey,
    addressSeed,
    maxEpoch,
    jwtRandomness,
  };
};

export const handleZkLoginByGoogle = async (
  data: {
    idToken: string;
    accessToken: string;
    error?: string;
  },
) => {
  return retry(
    async () => {
      const { idToken, error } = data;
      if (error) {
        if (error === 'access_denied') {
          console.error('Login with Google failed: Access Denied');
        }
        console.error(`Login with Google failed: ${error}`);
      }
      console.log(`[Login with idToken: ${idToken}`);
      const dataInfo = (await jwtDecode(idToken)) as any;
      console.log('JwtDecode', dataInfo);

      const dataAuth = await rf
        .getRequest('AuthRequest')
        .login(idToken);
      console.log('dataAuth', dataAuth);
      const { ephemeralPrivateKey, maxEpoch, jwtRandomness } =
      Storage.getZkLoginForGuest();
      const zkpData = await generateZkpData(
        idToken,
        dataAuth.salt,
        ephemeralPrivateKey,
        maxEpoch,
        jwtRandomness,
      );
      console.log('zkpData', zkpData);

      if (!!zkpData) {
        Storage.removeZkLoginForGuest();
      }

      return {
        accessToken: dataAuth.accessToken,
        salt: dataAuth.salt,
        jwt: idToken,
        name: dataInfo.name,
        avatar: dataInfo.picture,
        email: dataInfo.email,
        sub: dataInfo.sub,
        ...zkpData,
      };
    },
    { retries: 3 },
  );
};
