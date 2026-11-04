import Category from '../models/categoryModel.js';

export const getAllCategoriesService = async () => {
  return await Category.find();
};

export const createCategoryService = async (data) => {
  return await Category.create(data);
};

export const deleteCategoryService = async (id) => {
  return await Category.findByIdAndDelete(id);
};