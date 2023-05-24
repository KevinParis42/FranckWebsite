import '@/styles/globals.css'
import 'antd/dist/reset.css'
import type { AppProps } from 'next/app'
import { StepsProvider } from 'react-step-builder'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StepsProvider>
      <Component {...pageProps} />
    </StepsProvider>
  )
}
