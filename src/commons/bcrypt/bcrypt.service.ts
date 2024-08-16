import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcryptjs';

@Injectable()
export class BcryptService {

    hasher(password: string): string {
        const hash = hashSync(password, 10);
        return hash;
    }

    comparer(password: string, hash: string): boolean {
        const isMatch = compareSync(password, hash);
        return isMatch;
    }
}
