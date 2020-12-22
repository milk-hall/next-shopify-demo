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

const CHECKOUT_CREATE_MUTATION = gql`
  mutation checkoutCreate {
    checkoutCreate(input: {}) {
      checkout {
        id
      }
    }
  }
`;

export const CHECKOUT_FRAGMENT = gql`
  fragment checkout on Checkout {
    id
    webUrl
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalTaxV2 {
      amount
      currencyCode
    }
    totalPriceV2 {
      amount
      currencyCode
    }
    lineItems(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          variant {
            id
            title
            image {
              transformedSrc
            }
            priceV2 {
              amount
              currencyCode
            }
          }
          quantity
        }
      }
    }
  }
`;

const CHECKOUT_QUERY = gql`
  ${CHECKOUT_FRAGMENT}
  query checkout($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        ...checkout
      }
    }
  }
`;

const CHECKOUT_LINE_ITEMS_REPLACE_MUTATION = gql`
  ${CHECKOUT_FRAGMENT}
  mutation checkoutLineItemsReplace(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        ...checkout
      }
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

export const getCheckout = async () => {
  let checkoutId;
  checkoutId = localStorage.getItem("checkoutId");
  if (!checkoutId) {
    const { data } = await client.mutate({
      mutation: CHECKOUT_CREATE_MUTATION,
    });
    checkoutId = data.checkoutCreate.checkout.id;
    localStorage.setItem("checkoutId", checkoutId); // 7 days
  }

  const variables = {
    checkoutId,
  };

  const res = await client.query({
    query: CHECKOUT_QUERY,
    variables,
  });

  return res;
};
function getLineItems(lineItems){
  return lineItems.map(({ node })=> ({ variantId: node.variant.id, quantity: node.quantity }));
}

export const replaceLineItems = async (variables) => {
  const res = await client.mutate({
    mutation: CHECKOUT_LINE_ITEMS_REPLACE_MUTATION,
    variables,
  });
  return res;
};

export const deleteLineItems = async (variantId,data) => {
  let checkoutId;
  checkoutId = localStorage.getItem("checkoutId");
  let lineItems = getLineItems(data.lineItems.edges);
  lineItems = lineItems.filter(item=>item.variantId !== variantId)
  return replaceLineItems({ checkoutId, lineItems })
};
