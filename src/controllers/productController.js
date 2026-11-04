import * as productService from '../services/productService.js';

export const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductByIdService(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProductService(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await productService.updateProductService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProductService(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};