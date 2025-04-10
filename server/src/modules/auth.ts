import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

import * as bcrypt from 'bcrypt';

export type AuthenticatedUser = Pick<User, 'id' | 'username'>;

export const createJWT = (user: AuthenticatedUser): string => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
};

export const getUser = (token: string): AuthenticatedUser | null => {
    try {
        const user = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as AuthenticatedUser;

        if (typeof user === 'string') {
            return null;
        }

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            username: user.username,
        };
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const comparePasswords = (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 5);
};
