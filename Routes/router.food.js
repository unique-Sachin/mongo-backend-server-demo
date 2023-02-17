const foodRouter = require("express").Router();
const { FoodModel } = require("../Model/food.model");
const { fieldAnalyzer } = require("../Middlewares/fieldAnalyzer.middleware");
foodRouter.get("/", async (req, res) => {
  const { min, max, cuisine, price } = req.query;
  if (min && max) {
    const food = await FoodModel.find({
      $and: [
        { rating: { $gt: Number(min) } },
        { rating: { $lt: Number(max) } },
      ],
    });
    res.send(food);
  } else if (cuisine) {
    const food = await FoodModel.find({
      cuisine: { $regex: cuisine, $options: "i" },
    });
    res.send(food);
  } else if (price) {
    const food = await FoodModel.find({
      price: { $lt: Number(price) },
    });
    res.send(food);
  } else {
    const food = await FoodModel.find({});
    res.send(food);
  }
});

foodRouter.get("/:id", async (req, res) => {
  const food = await FoodModel.findById({ _id: req.params.id });
  res.send(food);
});

foodRouter.post("/", fieldAnalyzer, async (req, res) => {
  await FoodModel.insertMany([req.body]);
  res.send("food item added");
});
foodRouter.patch("/:id", async (req, res) => {
  await FoodModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.send(`food item ${req.params.id} has been updated`);
});
foodRouter.delete("/:id", async (req, res) => {
  await FoodModel.findByIdAndDelete({ _id: req.params.id });
  res.send(`food item ${req.params.id} has been deleted`);
});

module.exports = {
  foodRouter,
};
