import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://elsolar.co'

export default function PageSEO({ title, description, path, ogImage }) {
  const fullTitle = title
  const url = `${BASE_URL}${path}`
  const image = ogImage
    ? `${BASE_URL}/assets/images/global/social/${ogImage}`
    : `${BASE_URL}/assets/images/global/social/og-default.png`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="El Solar Creative Group" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}