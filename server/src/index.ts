import { config } from 'dotenv';
config();
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { getUser } from './modules/auth.js';
import db from './datasources/db.js';
import { env } from 'process';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

let PORT = 4000;
if (env.PORT) {
    PORT = parseInt(env.PORT);
}
if (isNaN(PORT)) {
    console.error(`PORT environment variable is not a number: ${env.PORT}`);
    process.exit(1);
}

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req }) => {
        const authorization = req.headers.authorization?.split('Bearer ')?.[1];
        const user = authorization ? getUser(authorization) : null;
        return {
            dataSources: {
                db,
            },
            user,
        };
    },
});

console.log(`🚀  Server ready at: ${url}`);
