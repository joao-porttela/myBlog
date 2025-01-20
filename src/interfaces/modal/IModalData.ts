import {IPost} from "../post.interface";
import {ICategory} from "../category.interface";
import {ISubCategory} from "../subCategory.interface";

export interface IModalData {
  post?: IPost;
  category?: ICategory;
  subCategory?: ISubCategory;
}
