import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Recipe } from "../models/recipe.model.js";
import { User } from "../models/user.model.js";

// get all recipes
const getAllRecipes = asyncHandler(async (_, resp) => {
    try {
        const recipes = await Recipe.find({});
        return resp.status(200).json(
            new ApiResponse(200, recipes, `All recipes fetched successfully`)
        );
    } catch (error) {
        throw new ApiError(400, `Couldn't find recipes: ${error}`);
    }
});

// create recipe
const createRecipe = asyncHandler(async (req, resp) => {
    const recipe = new Recipe(req.body);
    try {
        const response = await recipe.save();
        return resp.status(200).json(
            new ApiResponse(200, response, `Recipe created successfully`)
        );
    } catch (error) {
        throw new ApiError(400, `Couldn't create recipe: ${error}`);
    }
});

// save recipe
const savedRecipe = asyncHandler(async (req, resp) => {
    const { recipeId, userId } = req.body;

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            throw new ApiError(404, `Recipe not found`);
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, `User not found`);
        }

        if (!user.savedRecipes) {
            user.savedRecipes = [];
        }

        user.savedRecipes.push(recipeId);
        await user.save();

        return resp.status(201).json(
            new ApiResponse(200, { savedRecipes: user.savedRecipes }, `Recipe saved successfully`)
        );
    } catch (err) {
        throw new ApiError(400, `Couldn't save recipe: ${err}`);
    }
});

// ids of saved recipes
const getIdsOfSavedRecipes = asyncHandler(async (req, resp) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            throw new ApiError(404, `User not found`);
        }
        resp.status(200).json(new ApiResponse(200, user.savedRecipes, `Saved recipes IDs fetched successfully`));
    } catch (error) {
        throw new ApiError(400, `Couldn't get IDs of saved recipes: ${error}`);
    }
});

// get saved recipes
const getSavedRecipe = asyncHandler(async (req, resp) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            throw new ApiError(404, `User not found`);
        }

        const savedRecipes = await Recipe.find({
            _id: { $in: user.savedRecipes },
        });

        resp.status(200).json(new ApiResponse(200, savedRecipes, `Saved recipes fetched successfully`));
    } catch (error) {
        throw new ApiError(400, `Couldn't find saved recipes: ${error}`);
    }
});

// get user recipes
const getUserRecipes = asyncHandler(async (req, resp) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            throw new ApiError(404, `User not found`);
        }

        const userRecipes = await Recipe.find({ userOwner: user._id });
        return resp.status(200).json(new ApiResponse(200, userRecipes, `User recipes fetched successfully`));
    } catch (error) {
        throw new ApiError(400, `Couldn't fetch user recipes: ${error}`);
    }
});

// delete user recipe
const deleteUserRecipes = asyncHandler(async (req, resp) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);
        if (!recipe) {
            throw new ApiError(404, `Recipe not found`);
        }
        return resp.status(200).json(new ApiResponse(202, `Recipe deleted successfully`));
    } catch (error) {
        throw new ApiError(400, `Couldn't delete recipe: ${error}`);
    }
});

// update user recipe
const updateUserRecipe = asyncHandler(async (req, resp) => {
    try {
        const { recipeId } = req.params;
        const updateFields = req.body;

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            recipeId,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedRecipe) {
            throw new ApiError(404, `Recipe not found`);
        }

        return resp.status(200).json(new ApiResponse(200, updatedRecipe, "Recipe updated successfully"));
    } catch (error) {
        throw new ApiError(400, `Couldn't update recipe: ${error}`);
    }
});

// remove saved recipe
const removeSaveRecipe = asyncHandler(async (req, res) => {
    const { userId, recipeId } = req.params;

    if (!userId || !recipeId) {
        throw new ApiError(400, `User ID or Recipe ID not provided`);
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { savedRecipes: recipeId } },
            { new: true }
        );

        if (!user) {
            throw new ApiError(404, `User not found`);
        }

        res.status(200).json(new ApiResponse(200, `Recipe removed from saved`, { savedRecipes: user.savedRecipes }));
    } catch (error) {
        throw new ApiError(400, `Couldn't remove saved recipe: ${error}`);
    }
});

// get specific recipe by id
const getRecipeById = asyncHandler(async (req, resp) => {
    const { id: recipeId } = req.params;

    if (!recipeId) {
        throw new ApiError(400, `Recipe ID not provided`);
    }

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            throw new ApiError(404, `Recipe not found`);
        }

        resp.status(200).json(new ApiResponse(200, recipe, "Recipe fetched successfully"));
    } catch (error) {
        throw new ApiError(400, `Couldn't fetch recipe: ${error}`);
    }
});

export {
    getAllRecipes,
    createRecipe,
    savedRecipe,
    getIdsOfSavedRecipes,
    getSavedRecipe,
    getUserRecipes,
    deleteUserRecipes,
    updateUserRecipe,
    removeSaveRecipe,
    getRecipeById,
};
