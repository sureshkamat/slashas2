const express = require("express");
const { connection } = require("./utils/db");
const cors = require("cors");
const app = express();
app.use(express.json());
const { FavModel } = require("./models/favorite.model");

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("API Here");
});

app.get("/favorites", async (req, res) => {
  let fav = await FavModel.find();
  res.send(fav);
});

app.post("/favorites", async (req, res) => {
  try {
    let { author,content } = req.body;
    const new_fav = new FavModel({
      author,
      content
    });
    await new_fav.save();
    res.send({ msg: "Added", status: true });
  } catch (err) {
    res.send({ msg: "Error" });
  }
});





app.listen(8081, async () => {
  try {
    await connection;
    console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
  console.log("App is running on port 8081");
});
