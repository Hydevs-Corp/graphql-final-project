import { AuthenticatedUser } from "./modules/auth.js";
import { PrismaClient } from "@prisma/client";

export type DataSourceContext = {
    dataSources: {
        db: PrismaClient;
    };
    user: AuthenticatedUser | null;
};
