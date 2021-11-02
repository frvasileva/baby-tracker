import gql from "graphql-tag";


const fragments = {
  userInfo_detailed: gql`
    fragment UserInfo_Detailed on User {
     

      _id
      userId
      email
      createdOn
      name   
      children {
        name
        birthdate
        createdOn
        sex
        imagePath
      }
    }
  `,
  childInfo: gql`
    fragment ChildInfo on ChildProfile {
      _id
      birthdate
      name
      createdOn
      sex
      imagePath
    }
  `,
};

export const INSERT_USER_CUSTOM_INFO = gql`
  mutation ($input: UserInsertInput!) {
    insertOneUser(data: $input) {
      createdOn
      _id
    }
  }
`;
export const INSERT_CHILD_PROFILE = gql`
  mutation ($input: ChildProfileInsertInput!) {
    insertOneChildProfile(data: $input) {
      name
      createdOn
      _id
    }
  }
`;
export const GET_CHILD_PROFILE = gql`
  query ($_id: ObjectId) {
    childProfile(query: { _id: $_id }) {
      ...ChildInfo
    }
  }
  ${fragments.childInfo}
`;
export const GET_USER_PROFILE_INFO = gql`
  query ($userId: String) {
    user(query: { userId: $userId }) {
      ...UserInfo_Detailed
    }
  }
  ${fragments.userInfo_detailed}
`;

export const FOOD_ITEMS = gql`
  query {
        foodItems {
        name
    }
  }
`;

