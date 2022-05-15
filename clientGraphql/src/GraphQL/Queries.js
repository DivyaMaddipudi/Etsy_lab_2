import { gql } from "@apollo/client";

export const LOAD_PRODUCTS = gql`
  query {
    getItemsList {
      _id
      userId
      itemCategory
      itemName
      itemPrice
      itemDescription
      itemCount
      itemImage
    }
  }
`;

export const LOAD_CART_ITEMS = gql`
  query getCartList($userId: String!) {
    getCartList(userId: $userId) {
      userId
      qty
      itemId {
        _id
        itemCategory
        itemName
        itemPrice
        itemDescription
        itemCount
        itemImage
      }
    }
  }
`;
