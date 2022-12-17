const express = require("express");
const app = express();
const monogoose = require("mongoose");
const RagiterSchema = require("./models/Ragister");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const dbConnect = async () => {
  try {
    await monogoose.connect(
      "mongodb+srv://Rahul:SklvMYPQ8OjA7EYs@cluster0.3z86cw7.mongodb.net/Collage"
    );
    console.log("databse is connected");
  } catch (err) {
    console.log("database is not connected");
  }
};

dbConnect();

app.get("/", (req, res) => {
  console.log(res.send("Collage app is running"));
});

app.post("/ragister", async (req, res) => {
  let { name, email, mobile, password } = req.body;

  try {
    let FindedData = await RagiterSchema.find({ email });

    if (FindedData.length > 0) {
      res.send({
        status: "Founded",
        msg: "Data is Found you have to login first",
        data: FindedData[0],
      });
    } else {
      try {
        let RagietrSave = await RagiterSchema.create({
          name,
          email,
          mobile,
          password,
        });
        res.send({
          status: "Ok",
          msg: "Successfully saved",
          data: RagietrSave,
        });
      } catch (err) {
        res.send({ status: "Err", msg: "Something went wrong", data: err });
      }
    }
  } catch (err) {
    res.send({ status: "Err", msg: "Something went wrong", data: err });
  }
});

app.listen(4000, () => console.log("Server is running on 4000"));
