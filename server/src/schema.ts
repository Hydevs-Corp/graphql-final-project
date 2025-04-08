import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(join(dirname("./"), "../schema.graphql"));
export const typeDefs = readFileSync(
    join(__dirname, "../schema.graphql"),
    "utf-8"
);
