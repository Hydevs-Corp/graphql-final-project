import { CodegenConfig } from "@graphql-codegen/cli";
import { resolve } from "path";

const config: CodegenConfig = {
    schema: resolve(__dirname, "../schema.graphql"), 
    generates: {
        "./src/types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                contextType: "./context#DataSourceContext",
                mappers: {
                    Track: "./models#TrackModel",
                    Author: "./models#AuthorModel",
                },
            },
        },
    },
};

export default config;
