import App from 'next/app'
import Page from '../component/Page'

const MyApp = ({ Component, pageProps}) => (
        <Page>
            <Component {...pageProps} />
        </Page>
)

export default MyApp

