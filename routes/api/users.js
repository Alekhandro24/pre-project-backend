const express = require("express");

const { authenticate, validateBody } = require("../../middlewares");

const ctrl = require("../../controllers");

const { schemas } = require("../../models/recipe");

const authRouter = express.Router();

router.get("/:userId/own-recipes", authenticate, ctrl.listOwnRecipes);

router.post(
  "/:userId/own-recipes",
  auth,
  validateBody(schemas.addSchema),
  ctrl.addOwnRecipes
);

router.delete("/:userId/own-recipes/:recipeId", ctrl.removeOwnRecipes);

module.exports = authRouter;
