require("dotenv").config();
const app = require("express")();
const { json } = require("body-parser");
const { connection } = require("./Controller/db");
const { foodRouter } = require("./Routes/router.food");
app.use(json());

app.use("/", foodRouter);

app.listen(process.env.PORT, async () => {
  try {
    connection;
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
});
