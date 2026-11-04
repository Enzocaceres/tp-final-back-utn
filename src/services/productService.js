import Product from '../models/productModel.js';

export const getAllProductsService = async () => {
  return await Product.find().populate('categoria');
};

export const getProductByIdService = async (id) => {
  return await Product.findById(id).populate('categoria');
};

export const createProductService = async (data) => {
  return await Product.create(data);
};

export const updateProductService = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProductService = async (id) => {
  return await Product.findByIdAndDelete(id);
};