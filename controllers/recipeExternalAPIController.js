const axios = require('axios');

const MEAL_DB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

exports.getCategories = async (req, res) => {
  try {
    const response = await axios.get(`${MEAL_DB_BASE_URL}/categories.php`);

    if (response.status !== 200) {
      return res.status(response.status).json({ message: 'Failed to fetch categories from external API' });
    }

    const { categories } = response.data;

    const limitCount = req.query.limit ? parseInt(req.query.limit) : 0;
    const selectedCategories = limitCount > 0 ? categories.slice(0, limitCount) : categories;

    res.json({ categories: selectedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

exports.getRecipesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    const response = await axios.get(`${MEAL_DB_BASE_URL}/filter.php?c=${category}`);

    if (response.status !== 200) {
      return res.status(response.status).json({ message: 'Failed to fetch recipes from external API' });
    }

    res.json({ meals: response.data.meals || [] });
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};

exports.getRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Recipe ID parameter is required' });
    }

    const response = await axios.get(`${MEAL_DB_BASE_URL}/lookup.php?i=${id}`);

    if (response.status !== 200) {
      return res.status(response.status).json({ message: 'Failed to fetch recipe details from external API' });
    }

    res.json({ meal: response.data.meals ? response.data.meals[0] : null });
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    res.status(500).json({ message: 'Error fetching recipe details' });
  }
};

exports.searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query parameter is required' });
    }

    const response = await axios.get(`${MEAL_DB_BASE_URL}/search.php?s=${query}`);

    if (response.status !== 200) {
      return res.status(response.status).json({ message: 'Failed to search recipes from external API' });
    }

    res.json({ meals: response.data.meals || [] });
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ message: 'Error searching recipes' });
  }
};