/* import { importSchema } from 'graphql-import';

const typeDefs = importSchema('./data/schema/schema.graphql'); */

import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const typeDefs = mergeTypes(fileLoader(`${__dirname}/schema/**/*.graphql`), { all: true })

export { typeDefs };
