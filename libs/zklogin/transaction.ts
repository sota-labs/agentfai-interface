import { Transaction } from '@mysten/sui/transactions';
import config from '@/config';
import { Buffer } from 'buffer';
import retry from 'async-retry';
import { fetchZkProof, getEd25519PublicKey } from './auth';
import { getExtendedEphemeralPublicKey, getZkLoginSignature } from '@mysten/sui/zklogin';
import { SuiClient, SuiTransactionBlockResponse } from '@mysten/sui/client';
import {
  decodeSuiPrivateKey,
} from '@mysten/sui/cryptography';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

export type ZKProof = {
  proofPoints: {
    a: string[];
    b: string[][];
    c: string[];
  };
  issBase64Details: {
    value: string;
    indexMod4: number;
  };
  headerBase64: string;
};

const suiClient = new SuiClient({ url: config.rpcUrl });

export const executeTransactionBlockForZkUser = async (
  zkUser: any,
  txb: Transaction,
  sponsorGasFunc: any,
) => {
  if (!sponsorGasFunc) {
    throw new Error('sponsor_gas_func_required');
  }
  const txBytes = await txb.build({
    client: suiClient,
    onlyTransactionKind: true,
  });

  const sponsoredSig = await sponsorGasFunc(
    zkUser.zkAddress,
    Buffer.from(txBytes).toString('base64'),
  );

  const sponsoredTx = Transaction.from(sponsoredSig.bytes);
  let resData: any = {};

  let zkProof = zkUser.zkProof;

  await retry(
    async () => {
      try {
        console.log('zkProof to executed', zkProof);
        resData = await signAndExecutionTransactionSponsoredWithZkLogin({
          txBlock: sponsoredTx!,
          addressSeed: zkUser.addressSeed!,
          ephemeralPrivateKey: zkUser.ephemeralPrivateKey!,
          maxEpoch: zkUser.maxEpoch!,
          suiClient: suiClient,
          zkProof: zkProof!,
          sponsoredSig,
        });
      } catch (e: any) {
        if (e.message.includes('Invalid user signature')) {
          console.log('[zkProof Error]:', e);
          const ephemeralPublicKey = getEd25519PublicKey(
            zkUser.ephemeralPrivateKey,
          );
          const extendedEphemeralPublicKey =
            getExtendedEphemeralPublicKey(ephemeralPublicKey);

          zkProof = await fetchZkProof({
            maxEpoch: zkUser.maxEpoch,
            jwtRandomness: zkUser.jwtRandomness,
            extendedEphemeralPublicKey,
            jwt: zkUser.jwt,
            salt: zkUser.salt,
          });
          console.log('[zkProof Updated]:', zkProof);
          throw new Error('invalid_user_signature');
        }
      }
    },
    { retries: 3, minTimeout: 2000 },
  );

  await new Promise((r) => setTimeout(r, 2000)); // sleep for transaction confirmation
  console.log(`Digested transaction:`, resData?.digest);

  if (resData?.effects?.status?.status === 'failure') {
    throw new Error(resData?.effects?.status?.error);
  }

  return resData?.digest;
};

export async function signAndExecutionTransactionSponsoredWithZkLogin({
  txBlock,
  ephemeralPrivateKey,
  suiClient,
  addressSeed,
  maxEpoch,
  zkProof,
  sponsoredSig,
}: {
  txBlock: Transaction;
  ephemeralPrivateKey: string;
  suiClient: SuiClient;
  addressSeed: string;
  maxEpoch: number;
  zkProof: ZKProof;
  sponsoredSig: any;
}): Promise<SuiTransactionBlockResponse | null> {
  // createUserSignature
  const userSignature = await createUserSignature(
    txBlock,
    ephemeralPrivateKey,
    suiClient,
  );

  // createZkLoginSignature
  const zkLoginSignature = await createZkLoginSignature({
    userSignature: userSignature.signature,
    addressSeed,
    maxEpoch,
    zkProof,
  });

  try {
    await suiClient.dryRunTransactionBlock({
      transactionBlock: userSignature.bytes,
    });

    return await suiClient.executeTransactionBlock({
      transactionBlock: userSignature.bytes,
      signature: [zkLoginSignature, sponsoredSig.signature],
      options: {
        showEffects: true,
        showEvents: true,
        showObjectChanges: true,
      },
    });
  } catch (e: any) {
    throw e;
  }
}

async function createUserSignature(
  txBlock: Transaction,
  ephemeralPrivateKey: string,
  client: SuiClient,
) {
  const keyPair = decodeSuiPrivateKey(ephemeralPrivateKey);
  const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(keyPair.secretKey);

  return await txBlock.sign({
    client,
    signer: ephemeralKeyPair, // This must be the same ephemeral key pair used in the ZKP request
  });
}

async function createZkLoginSignature({
  addressSeed,
  zkProof,
  userSignature,
  maxEpoch,
}: {
  addressSeed: string;
  zkProof: ZKProof;
  userSignature: string;
  maxEpoch: number;
}) {
  const zkLoginSignature = getZkLoginSignature({
    inputs: {
      ...zkProof,
      addressSeed,
    },
    maxEpoch: maxEpoch,
    userSignature,
  });

  return zkLoginSignature;
}