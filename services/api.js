import { initializeApollo } from "../lib/apollo";
import { gql } from "@apollo/client";


const client = initializeApollo();

const PRODUCTS_FRAGMENT = gql`
fragment products on ProductConnection {
  edges {
    node {
      title
      handle
      description
      createdAt
      images(first: 1) {
        edges {
          node {
            transformedSrc
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
    cursor
  }
  pageInfo {
    hasNextPage
  }
}
`;

export const PRODUCTS_QUERY = gql`
${PRODUCTS_FRAGMENT}
query products(
  $cursor: String
  $query: String!
  $sortKey: ProductSortKeys!
  $reverse: Boolean!
) {
  products(
    first: 12
    after: $cursor
    query: $query
    sortKey: $sortKey
    reverse: $reverse
  ) {
    ...products
  }
}
`;

export const getFirstPage = async (variables={
  query: "",
  sortKey: "BEST_SELLING",
  reverse: false,
}) => {
  return client.query({
    query: PRODUCTS_QUERY,
    variables: variables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
  });
  
};