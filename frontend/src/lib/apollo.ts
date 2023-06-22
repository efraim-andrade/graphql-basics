import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const clientOnClientSide = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export const { getClient: clientOnServerSide } = registerApolloClient(() => {
  return new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });
});
