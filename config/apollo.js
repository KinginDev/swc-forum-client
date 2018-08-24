
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// Replace this with your project's endpoint

const GRAPHCOOL_API = 'https://api.graph.cool/simple/v1/cjksyk40v80sg0145j58iwet4';

export default () => new ApolloClient({
    link: new HttpLink({ uri: GRAPHCOOL_API }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
})
