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
  foodInfo_tiles: gql`
    fragment FoodItemsTile on FoodItem {
      _id
    name    
    friendlyUrl
    name
    positionOrder
    prepTime
    productImage
    friendlyUrl
     
    }
  `,
  foodInfo_detailes: gql`
    fragment FoodItemDetails on FoodItem{
      _id
    name
    allergenType
    foodGroup
    friendlyUrl
    isVisible
    isCommonAllergen
    name
    positionOrder
    prepTime
    productImage
    friendlyUrl
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
        _id
        name
        foodGroup
        positionOrder
    }
  }
`;
export const FOOD_ITEMS_TILE = gql`
  query {
        foodItems {
       ...FoodItemsTile
    }
  }
  ${fragments.foodInfo_tiles}

`;
export const FOOD_ITEMS_PER_CHILD = gql`
  query($childId: ObjectId) {
    childFoodItems(query:{ child: {_id:$childId}}){
    _id
    introductionDate
    food {
      _id
      name
      }
    }
  }  
`;

export const INSERT_FOOD_ITEM_FOR_CHILD = gql`
   mutation ($input: ChildFoodItemInsertInput!) {
      insertOneChildFoodItem(data: $input) {
        _id
        introductionDate
        child {
          _id
          name
        }
        food {
          _id
          name
        }
  }
}
`;

export const UPDATE_FOOD_ITEM_FOR_CHILD = gql`
   mutation ($childId: ObjectId, $foodId: ObjectId, $introductionDate: DateTime) {
    updateOneChildFoodItem(query:{child:{_id:$childId}, food:{_id:$foodId}}, set:{introductionDate:$introductionDate}){
    _id
    introductionDate
  }
}
`;

export const DELETE_FOOD_ITEM_FOR_CHILD = gql`
   mutation ($childId: ObjectId, $foodId: ObjectId) {
    deleteOneChildFoodItem(
    query: {child: {_id: $childId}, food: {_id: $foodId}}) 
    {
    food {
      _id
      name
    }
  }
}
`;

export const FOOD_ITEM_INFO_DETAILS = gql`
  query($friendlyUrl: String) {
    foodItem(query: {friendlyUrl:$friendlyUrl}) {
      name
      friendlyUrl
      allergenType
      positionOrder
      productImage
      description
  }
}  
`;
export const FIND_FOOD_BY_NAME = gql`
  query($foodName: String) {
    foodItems(query:{name: $foodName}) {
      name
      friendlyUrl
      allergenType
      positionOrder
      productImage
      description
  }
}  
`;