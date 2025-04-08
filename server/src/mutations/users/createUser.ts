import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const createUser: MutationResolvers["createUser"] = async (
    _,
    { username, password },
    { dataSources },
    __
) => {
    try {
        const createdUser = await dataSources.db.user.create({
            data: {
                username,
                password: await hashPassword(password),
            },
        });
        return {
            id: createdUser.id,
            username: createdUser.username,
            articles: [],
            comments: [],
            likes: [],
        };
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            throw new Error(e.message);
        }
        throw new Error((e as Error).message);
    }
};
