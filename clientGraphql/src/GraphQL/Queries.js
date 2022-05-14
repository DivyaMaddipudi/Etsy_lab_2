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
