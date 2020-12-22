import { useMemo, useState } from "react";
import { createModel } from "hox";
import { getCheckout,replaceLineItems } from "../services/api";

function getLineItems(lineItems){
  return lineItems.map(({ node })=> ({ variantId: node.variant.id, quantity: node.quantity }));
}

function useCarts() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const fetchCheckout = async () => {
    setLoading(true);
    const { data: res } = await getCheckout();
    setData(res.node);
    setLoading(false);
  };

  const addLineItem = async (variantId, quantity)=>{
    setLoading(true)
    let checkoutId = localStorage.getItem('checkoutId');
    const lineItems = getLineItems(data.lineItems?.edges);
    const lineItemIndex = lineItems.findIndex(item=>item.variantId===variantId);
    if (lineItemIndex >= 0) {
      lineItems[lineItemIndex].quantity += quantity;
    } else {
      lineItems.push({ variantId, quantity });
    }
    const { data:res } = await replaceLineItems({ checkoutId, lineItems })
    setData(res.checkoutLineItemsReplace.checkout);
    setLoading(false)
  }

  const checkoutNum = useMemo(() => {
    return data?.lineItems.edges.reduce((pre,item)=>item.node.quantity+pre,0)
  }, [data])
  
  return {
    data,
    loading,
    fetchCheckout,
    addLineItem,
    checkoutNum
    // loading,
  };
}

export default createModel(useCarts);
