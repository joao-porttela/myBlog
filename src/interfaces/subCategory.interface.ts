import {ICategory} from "./category.interface";
import {IPost} from "./post.interface";

export interface ISubCategory {
  readonly id?: string;
  name?: string;
  category?: ICategory;
  categoryId?: string;
  readonly authorID?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  posts?: IPost[];
}
