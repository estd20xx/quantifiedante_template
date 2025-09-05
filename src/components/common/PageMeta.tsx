import React from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"

const PageMeta = ({ title, description }: { title: string; description: string }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>

    <meta key="title" content={title} property="og:title" />
    <meta content={description} property="og:description" />
  </Helmet>
)

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
)

export default PageMeta
