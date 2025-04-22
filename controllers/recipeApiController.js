const UserLike = require('../models/UserLike');
const User = require('../models/User');

exports.likeRecipe = async (req, res) => {
  try {

    const { idMeal, strMeal, strMealThumb } = req.body;

    const userId = req.user.userId;

    if (!idMeal || !strMeal || !strMealThumb) {
      return res.status(400).json({ message: 'Missing required recipe information' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let userLike = await UserLike.findOne({ userId });

    if (!userLike) {
      userLike = new UserLike({
        userId,
        userEmail: user.email,
        likedRecipes: []
      });
    }

    const alreadyLiked = userLike.likedRecipes.some(recipe => recipe.idMeal === idMeal);

    if (alreadyLiked) {
      return res.status(400).json({ message: 'Recipe already liked' });
    }

    userLike.likedRecipes.push({
      idMeal,
      strMeal,
      strMealThumb
    });
    await userLike.save();

    res.status(201).json({ message: 'Recipe liked successfully' });
  } catch (error) {
    console.error('Error liking recipe:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.unlikeRecipe = async (req, res) => {
  try {
    const { mealId } = req.params;
    const userId = req.user.userId;

    const userLike = await UserLike.findOne({ userId });

    if (!userLike) {
      return res.status(404).json({ message: 'No liked recipes found' });
    }

    userLike.likedRecipes = userLike.likedRecipes.filter(
      recipe => recipe.idMeal !== mealId
    );


    await userLike.save();

    res.json({ message: 'Recipe unliked successfully' });
  } catch (error) {
    console.error('Error unliking recipe:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { mealId } = req.params;
    const userId = req.user.userId;

    const userLike = await UserLike.findOne({ userId });

    if (!userLike) {
      return res.status(404).json({ message: 'No liked recipes found' });
    }

    const recipeIndex = userLike.likedRecipes.findIndex(
      recipe => recipe.idMeal === mealId
    );

    if (recipeIndex === -1) {
      return res.status(404).json({ message: 'Recipe not found in liked recipes' });
    }

    userLike.likedRecipes[recipeIndex].isFavorite =
      !userLike.likedRecipes[recipeIndex].isFavorite;

    await userLike.save();

    res.json({
      message: 'Favorite status toggled successfully',
      isFavorite: userLike.likedRecipes[recipeIndex].isFavorite
    });
  } catch (error) {
    console.error('Error toggling favorite status:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getLikedRecipes = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userLike = await UserLike.findOne({ userId });

    if (!userLike) {
      return res.json({ likedRecipes: [] });
    }

    res.json({ likedRecipes: userLike.likedRecipes });
  } catch (error) {
    console.error('Error getting liked recipes:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getFavoriteRecipes = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userLike = await UserLike.findOne({ userId });

    if (!userLike) {
      return res.json({ favoriteRecipes: [] });
    }

    const favoriteRecipes = userLike.likedRecipes.filter(recipe => recipe.isFavorite);

    res.json({ favoriteRecipes });
  } catch (error) {
    console.error('Error getting favorite recipes:', error);
    res.status(500).json({ message: error.message });
  }
};