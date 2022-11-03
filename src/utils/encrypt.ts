import * as crypto from 'crypto';

export function encrypt(str: string) {
  return crypto.createHash('md5').update(str).digest('hex');
}
