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

export const LOAD_USER_PROFILE = gql`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      username
      email
      phoneNumber
      dob
      gender
      profilePic
      about
      city
      fullAddress
    }
  }
`;

export const LOAD_PURCHASES_LIST = gql`
  query getPurchasesList($userId: String!) {
    getPurchasesList(userId: $userId) {
      _id
      userId
      qty
      itemId
      itemName
      itemPrice
      itemDescription
      itemCount
      itemImage
      giftMessage
    }
  }
`;
export const LOAD_SHOP_ITEMS = gql`
  query getAllShopItems($userId: String!) {
    getAllShopItems(userId: $userId) {
      userId
      itemName
      _id
      itemPrice
      itemCount
      itemCategory
      itemImage
      itemDescription
    }
  }
`;
