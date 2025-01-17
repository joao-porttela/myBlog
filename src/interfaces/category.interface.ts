import {IPost} from "./post.interface";
import {ISubCategory} from "./subCategory.interface";

export interface ICategory {
  readonly id?: string;
  name?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  subCategories?: ISubCategory[];
  posts?: IPost[];
}
