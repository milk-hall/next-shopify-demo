import { initializeApollo } from "../lib/apollo";
import { gql } from "@apollo/client";
import { sortOpts } from "../models/map";

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


const PRODUCT_FRAGMENT = gql`
  fragment product on Product {
    title
    description
    images(first: 1) {
      edges {
        node {
          altText
          transformedSrc
        }
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  ${PRODUCT_FRAGMENT}
  query product($handle: String!) {
    productByHandle(handle: $handle) {
      ...product
    }
  }
`;

export const getFirstPage = async (
  variables = {
    query: "",
    sortKey: 0,
    reverse: false,
  }
) => {
  return client.query({
    query: PRODUCTS_QUERY,
    variables: {
      ...variables,
      sortKey: sortOpts[variables.sortKey]?.sortKey.toUpperCase(),
      reverse: variables.reverse !== "false" && variables.reverse !== false,
    },
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
  });
};

export const getHandleProduct = async (variables) => {
  return client.query({
    query: PRODUCT_QUERY,
    variables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
  });
};
