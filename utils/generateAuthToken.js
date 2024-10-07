import { randomBytes as _randomBytes } from 'crypto';

export async function generateUniqueToken() {
    const timestamp = Date.now();
    const paddedTimestamp = String(timestamp).padStart(16, '0');
    const randomBytes = _randomBytes(8).toString('base64').replace(/=/g, '');
    const token = `${paddedTimestamp}-${randomBytes}`;
    return Buffer.from(token).toString('base64');
}

