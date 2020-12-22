import { useEffect, useState } from "react";
import { createModel } from "hox";
import { getFirstPage } from "../services/api";
function useProducts() {
  const [data, setData] = useState({ edges: [], pageInfo: {} });
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const init = async ({ initData, variables }) => {
    if (initData) {
      setData(initData);
      return;
    }
    setInitLoading(true);
    const { data: res } = await getFirstPage(variables);
    setData(res.products);
    setInitLoading(false);
  };
  const fetchMore = async (variables) => {
    setLoading(true);
    const { data: res } = await getFirstPage(variables);
    setData((state) => ({
      edges: [...state.edges, ...res.products.edges],
      pageInfo: res.products.pageInfo,
    }));
    setLoading(false);
  };

  return {
    data,
    loading,
    initLoading,
    init,
    fetchMore,
    // loading,
  };
}

export default createModel(useProducts);
