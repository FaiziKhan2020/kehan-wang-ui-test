import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import App from "./App";

const httpLink = createHttpLink({
  uri: "http://testing-leaf-server-env.eba-3fyupvsp.us-east-1.elasticbeanstalk.com/graphql",
  credentials: "include",
});

const removeTypenameLink = removeTypenameFromVariables();

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: removeTypenameLink.concat(httpLink),
  cache,
  connectToDevTools: true,
});

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
