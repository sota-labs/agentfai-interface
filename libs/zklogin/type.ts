export type GoogleIdTokenPayload = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  at_hash: string;
  nonce: string;
  iat: string;
  exp: string;
  alg: string;
  kid: string;
  typ: string;
  hd: string;
  email: string;
  email_verified: string;
};

export type ZkProofParams = {
  maxEpoch: number | null;
  jwtRandomness: string | null;
  extendedEphemeralPublicKey: string | null;
  jwt: string | null;
  salt: string | null;
};

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

export type zkUser = {
  zkProof: ZKProof;
  addressSeed: string;
  ephemeralPrivateKey: string;
  maxEpoch: number;
  zkAddress: string;
  jwt: string;
  accessToken: string;
  salt: string;
  email: string;
  avatar: string;
  name: string;
  jwtRandomness: string;
};
