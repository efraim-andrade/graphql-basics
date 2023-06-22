"use client";

import { ApolloProvider } from "@apollo/client";

import { clientOnClientSide } from "~/lib/apollo";
import WithClientWrapper from "~/app/in-client/with-wrapper/page";

export default function InClient() {
  return (
    <ApolloProvider client={clientOnClientSide}>
      <WithClientWrapper />
    </ApolloProvider>
  );
}
