const { ApolloServer } = require("@apollo/server");
const { InMemoryLRUCache } = require("@apollo/utils.keyvaluecache");

const resolvers = require("../controller");
const typeDefs = require("../schemas");

const createServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    cache: new InMemoryLRUCache({
      maxSize: Math.pow(2, 20) * 100,
      ttl: 300000,
    }),
  });
};

module.exports = createServer;
