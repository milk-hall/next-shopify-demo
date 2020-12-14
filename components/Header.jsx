import Head from 'next/head'

const Header = ({ title }) => {
  return (
    <Head>
      <title>{title+'Next Shopify Storefront'}</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    </Head>
  )
}

export default Header