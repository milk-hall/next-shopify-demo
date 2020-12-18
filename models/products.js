import { useEffect, useState } from "react";
import { createModel } from "hox";
import { getFirstPage } from "../services/api";
function useProducts() {
  const [data, setData] = useState({ edges: [], pageInfo: {} });
  const [loading, setLoading] = useState(false);
  const init = async ({ initData, variables }) => {
    if (initData) {
      setData(initData);
      return;
    }
    setLoading(true);
    const { data: res } = await getFirstPage(variables);
    setData(res.products);
    setLoading(false);
  };
  const fetchMore = async (variables) => {
    setLoading(true);
    const { data: res } = await getFirstPage(variables);
    setData((state) => ({
      edges: [...state.edges, ...res.products.edges],
      pageInfo: res.pageInfo,
    }));
    setLoading(false);
  };

  return {
    data,
    loading,
    init,
    fetchMore,
    // loading,
  };
}

export default createModel(useProducts);
