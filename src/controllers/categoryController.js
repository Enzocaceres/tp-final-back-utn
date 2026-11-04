import * as categoryService from '../services/categoryService.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = await categoryService.createCategoryService(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.deleteCategoryService(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.status(200).json({ message: 'Categoría eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};