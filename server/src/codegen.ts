import { CodegenConfig } from '@graphql-codegen/cli';
import { resolve } from 'path';

const config: CodegenConfig = {
    schema: resolve(__dirname, '../schema.graphql'),
    generates: {
        './src/types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
            config: {
                contextType: './context#DataSourceContext',
                mappers: {
                    User: '@prisma/client#User as UserModel',
                    Article: '@prisma/client#Article as ArticleModel',
                    Comment: '@prisma/client#Comment as CommentModel',
                    Like: '@prisma/client#Like as LikeModel',
                },
            },
        },
    },
};

export default config;
