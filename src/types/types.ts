export interface FoodInfo {
  _id: number;
  name: string;
  friendlyUrl: string;
  positionOrder: number;
  prepTime: string;
  productImage: string;
  suggestionAge: string;
}

export interface FoodItemTracker {
  _id: number;
  name: string;
  foodGroup: string;
  positionOrder: number;
  productImage: string;
}
