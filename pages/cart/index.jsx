import { useEffect } from "react";
import Layout from "../../components/Layout"
import useCarts from '../../models/carts'

const Cart = ()=>{
  const { fetchCheckout,data } = useCarts();
  useEffect(()=>{
    fetchCheckout()
  },[])
  return (
    <Layout title="Cart">
      Cart
    </Layout>
  )
}

export default Cart