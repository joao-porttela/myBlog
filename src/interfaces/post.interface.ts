import {ICategory} from "./category.interface";
import {ISubCategory} from "./subCategory.interface";
import {ITag} from "./tag.interface";

export interface IPost {
  id?: string;
  slug?: string;
  title?: string;
  content?: string | null;
  published?: boolean;
  category: ICategory | null;
  subCategory: ISubCategory | null;
  readonly authorId?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date | null;
  readonly tags?: ITag[] | null;
  readonly categoryId?: string | null;
  readonly subCategoryId?: string | null;
}
