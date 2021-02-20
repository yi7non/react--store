// Next.js uses the App component to initialize pages.
// You can override it and control the page initialization.
// Which allows you to do amazing things like:
// Persisting layout between page changes
// Keeping state when navigating pages
// Custom error handling using componentDidCatch
// Inject additional data into pages
// Add global CSS

// import App from "next/app";
import Page from '../component/Page'
import withApollo from 'next-with-apollo'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const MyApp = ({ Component, pageProps, apollo }) => (
  // The Component prop is the active page,
  // so whenever you navigate between routes, Component will change to the new page.
  //  Therefore, any props you send to Component will be received by the page.
  // pageProps is an object with the initial props that were preloaded for your page
  //  by one of our data fetching methods, otherwise it's an empty object.
  <ApolloProvider client={apollo}>
    <Page>
      <Component {...pageProps} />
    </Page>
  </ApolloProvider>
)

export default withApollo(({ initialState }) => {
  return new ApolloClient({
    uri: 'http://localhost:4444/',
    cache: new InMemoryCache().restore(initialState || {})
  })
})(MyApp)
