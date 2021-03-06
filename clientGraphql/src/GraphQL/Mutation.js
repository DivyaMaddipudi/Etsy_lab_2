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

export const EDIT_PROFILE = gql`
  mutation editProfile(
    $username: String!
    $email: String!
    $phoneNumber: Int!
    $dob: String!
    $gender: String!
    $profilePic: String!
    $about: String!
    $city: String!
    $fullAddress: String!
  ) {
    addShopItem(
      username: $username
      email: $email
      phoneNumber: $phoneNumber
      dob: $dob
      gender: $gender
      profilePic: $profilePic
      about: $about
      city: $city
      fullAddress: $fullAddress
    ) {
      username
      email
      phoneNumber
      city
      gender
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
    $itemPrice: Int!
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
      itemPrice: $itemPrice
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

export const EDIT_ITEM_QTY = gql`
  mutation editItemQtyById($itemId: String!, $itemCount: Int!, $sales: Int!) {
    editItemQtyById(itemId: $itemId, itemCount: $itemCount, sales: $sales) {
      itemCount
    }
  }
`;

export const CLEAR_CART = gql`
  mutation clearCart {
    clearCart {
      itemId
    }
  }
`;
