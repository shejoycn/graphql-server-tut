const { ApolloServer, gql } = require("apollo-server");

// typeDefs tell the GraphQL server what data to expect
// Notice the gql tag, this converts your string into GraphQL strings that can be read by Apollo
const typeDefs = gql`
  type Query {
    hello: String!
    randomNumber: Int!
    message : String!
    shortDescription: String
  }
`;
// the Query type outlines all the queries that can be called by the client
// hello and randomNumber are the names of the queries
// The exclamation mark (!) tells Apollo Server that a result is required

// Here, we define two queries, one returns a String and another returns a Int

// When a query is called a resolver with the same name is run
// The API returns whatever is returned by the resolver
// We are using arrow functions so the "return" keyword is not required
const resolvers = {
  // The name of the resolver must match the name of the query in the typeDefs
  Query: {
    // When the hello query is invoked "Hello world" should be returned
    hello: () => "Hello world!",
    message : () =>{
        const dt = new Date();
        const day = dt.getDay();
        return day
    },
    // When we call the randomNumber query, it should return a number between 0 and 10
    randomNumber: () => Math.round(Math.random() * 10),
  },
};

// Create an instance of ApolloServer and pass in our typeDefs and resolvers
const server = new ApolloServer({
  // If the object key and value have the same name, you can omit the key
  typeDefs,
  resolvers,
});

// Start the server at port 8080
server.listen({ port: 8080 }).then(({ url }) => console.log(`GraphQL server running at ${url}`));