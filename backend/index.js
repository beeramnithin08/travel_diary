const express = require("express");
require("./db/config");
const User = require("./db/user");
const Entry = require("./db/entry");

const Jwt = require("jsonwebtoken");

const jwtKey = "swivl";

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  try {
    let newuser = new User(req.body);
    let user = await newuser.save();

    user = user.toObject();
    delete user.password;
    Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp.status(500).send({
          result: "Something went wrong, Please try after sometime",
        });
      }
      resp.send({ user, auth: token });
    });
  } catch (error) {
    resp.status(500).send({ result: "Error registering user" });
  }
});

app.post("/login", async (req, resp) => {
  try {
    if (req.body.password && req.body.email) {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            resp.status(500).send({

              result: "Something went wrong, Please try after sometime",
            });
          }
          resp.send({ user, auth: token });
        });
      } else{
        resp.status(404).send({ result: "No user found" });
  
      }
    } else {
      resp.status(400).send({ result: "Missing email or password" });
    }
  } catch (error) {
    resp.status(500).send({ result: "Error logging in" });
  }
});

app.post("/add-entry",verifyToken, async (req, resp) => {
  try {
    let entry = new Entry(req.body);
    let result = await entry.save();
    resp.send(result);
  } catch (error) {
    resp.status(500).send({ result: "Error adding entry" });
  }
});

//API to get the list of products
app.get("/entries", verifyToken,async (req, resp) => {
  let entry = await Entry.find();
  if (entry.length > 0) {
    resp.send(entry);
  } else {
    resp.send({ result: "No entries" });
  }
});

//API to delete a product
app.delete("/entry/:id",verifyToken, async (req, resp) => {
  console.log(req.params.id);
  let result = await Entry.deleteOne({ _id: req.params.id });
  console.log(result);
  resp.send(result);
});

//API for get single product to show the data in update form
app.get("/entry/:id",verifyToken, async (req, resp) => {
  let result = await Entry.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No record found" });
  }
});

//API to update data
app.put("/entry/:id",verifyToken, async (req, resp) => {
  const result = await Entry.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

//API for searching
app.get("/search/:key",verifyToken, async (req, resp) => {
  let result = await Entry.find({
    $or: [
      { title: { $regex: new RegExp(req.params.key, "i") } },
      { description: { $regex: new RegExp(req.params.key, "i") } },
      { location: { $regex: new RegExp(req.params.key, "i") } },
    ],
  });
  resp.send(result);
});


function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];

    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with header" });
  }
}

app.listen(4000, () => {
  console.log("server is running at http://localhost:4000...");
});



