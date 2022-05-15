import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;

export const CHECK_SHOP_DUPLICATES = gql`
  mutation findShopDuplicates($shopName: String!) {
    findShopDuplicates(shopName: $shopName) {
      shopName
    }
  }
`;

export const CREATE_SHOP_NAME = gql`
  mutation createShop($id: String!, $shopName: String!) {
    createShop(id: $id, shopName: $shopName) {
      shopName
    }
  }
`;

//Doubt
export const ADD_PRODUCT = gql`
  mutation addShopItem(
    $itemName: String!
    $userId: String!
    $itemCategory: String!
    $itemPrice: String!
    $itemDescription: String!
    $itemCount: String!
    $itemImage: String!
  ) {
    addShopItem(
      userId: $userId
      itemName: $itemName
      itemCategory: $itemCategory
      itemPrice: $itemPrice
      itemDescription: $itemDescription
      itemCount: $itemCount
      itemImage: $itemImage
    ) {
      userId
      itemName
    }
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation addToCart($userId: String!, $itemId: String!, $qty: Int!) {
    addToCart(userId: $userId, itemId: $itemId, qty: $qty) {
      userId
      itemId
      qty
    }
  }
`;

export const DELETE_ITEM_FROM_CART = gql`
  mutation deleteFromCart($itemId: String!) {
    deleteFromCart(itemId: $itemId) {
      itemId
    }
  }
`;

export const ADD_ITEM_TO_PURCHASES = gql`
  mutation addItemToPurchases(
    $itemId: String!
    $userId: String!
    $itemName: String!
    $itemImage: String!
    $itemCount: Int!
    $totalPrice: Float
    $qty: Int!
    $itemDescription: String!
    $giftMessage: String!
  ) {
    addItemToPurchases(
      itemId: $itemId
      userId: $userId
      itemName: $itemName
      itemImage: $itemImage
      itemCount: $itemCount
      totalPrice: $totalPrice
      qty: $qty
      itemDescription: $itemDescription
      giftMessage: $giftMessage
    ) {
      itemId
      userId
      itemName
    }
  }
`;
