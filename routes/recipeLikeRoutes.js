const express = require('express');
const router = express.Router();
const recipeLikeController = require('../controllers/recipeApiController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/like', recipeLikeController.likeRecipe);
router.delete('/unlike/:mealId', recipeLikeController.unlikeRecipe);
router.patch('/favorite/:mealId', recipeLikeController.toggleFavorite);
router.get('/liked', recipeLikeController.getLikedRecipes);
router.get('/favorites', recipeLikeController.getFavoriteRecipes);

module.exports = router;