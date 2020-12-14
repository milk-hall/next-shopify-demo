import { useApolloClient } from "@apollo/client"
import Layout from "../../components/Layout"
import { initializeApollo } from "../../lib/apollo"

const Products = ()=>{
  const apolloClient = initializeApollo()

  return(
    <Layout title='Products'>
      Products
    </Layout>
  )
}

export default Products