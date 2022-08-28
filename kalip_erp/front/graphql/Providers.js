import React from "react";
// import { createHttpLink } from "apollo-link-http";
import { createUploadLink } from "apollo-upload-client";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    from,
} from "@apollo/client";
// import { onError } from "@apollo/client/link/error";
import { setContext } from "apollo-link-context";

// const NEXT_SERVER = process.env.NEXT_SERVER
const NEXT_SERVER = 'http://127.0.0.1:8000'

const httpLink = createUploadLink({
    uri: `${NEXT_SERVER}/graphql/`,
    
});

const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    return {
        headers: {
            Authorization: token ? token : "",
        },
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

const GqlProvider = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GqlProvider;
