const fieldAnalyzer = (req, res, next) => {
  const { dish_name, price, cuisine, rating } = req.body;
  if (dish_name && price && cuisine && rating) {
    next();
  } else {
    res.send({
      err: "Few fields are missing, cannot process the request",
    });
  }
};

module.exports = {
  fieldAnalyzer,
};
