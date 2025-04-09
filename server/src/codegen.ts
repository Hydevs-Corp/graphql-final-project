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
          User: './models#UserModel',
          Post: './models#PostModel',
          Comment: './models#CommentModel',
          Like: './models#LikeModel',
        },
      },
    },
  },
};

export default config;
