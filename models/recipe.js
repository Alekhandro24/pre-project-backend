const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

categoryVariants = [
  "Beef",
  "Breakfast",
  "Chicken",
  "Dessert",
  "Goat",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
];
const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: categoryVariants,
      required: true,
    },
    area: { type: String, required: true },
    instructions: { type: String, required: true },
    description: { type: String, required: true },
    thumb: { type: String, required: true },
    preview: { type: String, required: true },
    time: { type: String, required: true },
    popularity: { type: Number, required: true },
    favorites: { type: [Schema.Types.ObjectId] },
    likes: { type: Array },
    youtube: { type: String },
    tags: { type: [String] },
    ingredients: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "ingredients",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  time: Joi.string().required(),
  ingredients: Joi.objectId().required(),
  instructions: Joi.string().required(),
});

const schemas = {
  addSchema,
};

recipeSchema.post("save", handleMongooseError);

const Recipe = model("recipe", recipeSchema);

module.exports = {
  Recipe,
  schemas,
};
