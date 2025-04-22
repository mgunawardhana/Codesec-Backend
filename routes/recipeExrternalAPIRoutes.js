const express = require('express');
const router = express.Router();
const recipeApiController = require('../controllers/recipeExternalAPIController');
// const authMiddleware = require('../middleware/authMiddleware');


router.get('/categories', recipeApiController.getCategories);
router.get('/category/:category', recipeApiController.getRecipesByCategory);
router.get('/details/:id', recipeApiController.getRecipeDetails);
router.get('/search', recipeApiController.searchRecipes);

// router.get('/categories', authMiddleware, recipeApiController.getCategories);
// router.get('/category/:category', authMiddleware, recipeApiController.getRecipesByCategory);
// router.get('/details/:id', authMiddleware, recipeApiController.getRecipeDetails);
// router.get('/search', authMiddleware, recipeApiController.searchRecipes);

module.exports = router;