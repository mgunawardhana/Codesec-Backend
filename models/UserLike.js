const mongoose = require('mongoose');

const userLike = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    likedRecipes: [
      {
        idMeal: {
          type: String,
          required: true,
        },
        strMeal: {
          type: String,
          required: true,
        },
        strMealThumb: {
          type: String,
          required: true,
        },
        likedAt: {
          type: Date,
          default: Date.now,
        },
        isFavorite: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const UserLike = mongoose.model('UserLike', userLike);
module.exports = UserLike;
