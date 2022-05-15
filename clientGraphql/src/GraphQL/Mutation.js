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
