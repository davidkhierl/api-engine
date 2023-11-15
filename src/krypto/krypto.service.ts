import {
  AesCipher,
  KryptoEncryptedKey,
  KryptoKey,
  KryptoKeyDestructured,
  ParsedKryptoKey,
} from '@/krypto/types/krypto.types';
import { Injectable } from '@nestjs/common';
import * as Crypto from 'crypto';

@Injectable()
export class KryptoService {
  private readonly _FINGERPRINT_LENGTH = 8;
  private readonly _kryptoKeyRegex =
    /^AE\.aesgcm256\.(?<key>[a-zA-Z0-9-_]{43}=?)$/;
  private readonly _kryptoEncryptedKeyStringRegex =
    /^v1\.aesgcm256\.(?<fingerprint>[0-9a-fA-F]{8})\.(?<iv>[a-zA-Z0-9-_]{16})\.(?<ciphertext>[a-zA-Z0-9-_]{22,})={0,2}$/;

  /**
   * Generate an AES-GCM 256-bit serialized key.
   */
  generateKey() {
    const length = 32;
    const key = Crypto.randomBytes(length);
    return this._formatKey(key);
  }

  encrypt(input: string, key: KryptoKey | ParsedKryptoKey): KryptoEncryptedKey {
    if (typeof key === 'string') {
      key = this._parseKey(key);
    }
    const { text: ciphertext, iv } = this._encryptAesGcm(
      key.raw as Uint8Array,
      input,
    );
    return this._encodeEncryptedString(key.fingerprint, iv, ciphertext);
  }

  decrypt(input: KryptoEncryptedKey, key: KryptoKey | ParsedKryptoKey): string {
    const match = input.match(this._kryptoEncryptedKeyStringRegex);
    if (!match) {
      throw new Error(`Unknown message format: ${input}`);
    }
    const iv = match.groups.iv;
    const ciphertext = match.groups.ciphertext;
    let aesKey: CryptoKey | Uint8Array;
    if (typeof key === 'string') {
      aesKey = this._deSerializeKey(key);
    } else {
      aesKey = key.raw;
    }
    return this._decryptAesGcm(aesKey as Uint8Array, {
      iv: this._b64Decode(iv),
      text: this._b64Decode(ciphertext),
    });
  }

  destructureKey(key: KryptoKey): KryptoKeyDestructured {
    return { long: key.slice(13, 47), short: key.slice(47) };
  }

  rebuildKey(long: string, short: string): KryptoKey {
    const key = long.concat(short);
    return this._formatKey(Buffer.from(key, 'base64'));
  }

  generateTestString(size: number) {
    return Crypto.randomBytes(size).toString('hex');
  }

  validateTestKey(key: KryptoKey, test: string) {
    try {
      return !!this.decrypt(test, key);
    } catch (error) {
      // console.log(error);
      return false;
    }
  }

  private _encryptAesGcm(key: Uint8Array, message: string): AesCipher {
    const iv = Crypto.randomBytes(12);
    const cipher = Crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = cipher.update(message, 'utf8');
    cipher.final();
    const tag = cipher.getAuthTag();

    return {
      text: new Uint8Array(Buffer.concat([encrypted, tag])),
      iv,
    };
  }

  private _decryptAesGcm(key: Uint8Array, cipher: AesCipher): string {
    const decipher = Crypto.createDecipheriv('aes-256-gcm', key, cipher.iv);
    const tagStart = cipher.text.length - 16;
    const message = cipher.text.slice(0, tagStart);
    const tag = cipher.text.slice(tagStart);
    decipher.setAuthTag(tag);
    return decipher.update(message, undefined, 'utf8') + decipher.final('utf8');
  }

  private _encodeEncryptedString(
    fingerprint: string,
    iv: Uint8Array,
    ciphertext: Uint8Array,
  ) {
    return [
      'v1',
      'aesgcm256',
      fingerprint,
      this._b64Encode(iv),
      this._b64Encode(ciphertext),
    ].join('.');
  }

  /**
   * Format and serialize a Uint8Array to a Krypto key format.
   * @param raw - Buffer key to serialize
   * @private
   */
  private _formatKey(raw: Uint8Array) {
    return ['AE', 'aesgcm256', this._b64Encode(raw)].join('.');
  }

  private _parseKey(key: KryptoKey): ParsedKryptoKey {
    return {
      raw: this._deSerializeKey(key),
      fingerprint: this._getKeyFingerPrint(key),
    };
  }

  /**
   * De-serialize a Krypto key into an Uint8Array.
   * @param key - Serialized Krypto key
   */
  private _deSerializeKey(key: KryptoKey): Uint8Array {
    const match = key.match(this._kryptoKeyRegex);
    if (!match) {
      throw new Error('Unknown key format');
    }
    return this._b64Decode(match.groups.key);
  }

  /*
   * Calculate a key fingerprint
   * Fingerprint is the first 8-bytes from the SHA-256 of the
   * serialized key text, represented as a hexadecimal string.
   */
  private _getKeyFingerPrint(key: KryptoKey): string {
    const data = this._utf8Encode(key);
    const hash = Crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex').slice(0, this._FINGERPRINT_LENGTH);
  }

  private _b64Encode(input: Uint8Array): string {
    return this._urlSafe(
      Buffer.from(input, 0, input.length).toString('base64'),
    );
  }

  private _b64Decode(input: string): Uint8Array {
    const buffer = Buffer.from(input, 'base64');
    return new Uint8Array(buffer, 0, buffer.length);
  }

  private _utf8Encode(input: string): Uint8Array {
    const utf8Encoder = new TextEncoder();
    const buffer = utf8Encoder.encode(input);
    return new Uint8Array(buffer, 0, buffer.length);
  }

  private _urlSafe(text: string): string {
    return text.replace(/\+/g, '-').replace(/\//g, '_');
  }
}
