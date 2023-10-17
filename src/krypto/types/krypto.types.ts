export type KryptoKey = string;

export type KryptoEncryptedKey = string;

export interface KryptoKeyDestructured {
  long: string;
  short: string;
}

export interface ParsedKryptoKey {
  raw: Uint8Array | CryptoKey;
  fingerprint: string;
}

export interface AesCipher {
  iv: Uint8Array;
  text: Uint8Array;
}
