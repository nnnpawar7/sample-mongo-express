import express from "express";
import expressSession  from "express-session";
import passport from "passport";
import { initializePassport } from "./passportConfig";
import { db, usr } from "./db";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.then((data) => {
}).catch((e) => {
});

initializePassport(passport);

app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/user", (req, res, next) => {
  res.send("regular");
});

app.post("/register", async (req, res, next) => {
  try {
    const existingUsr = await usr.findOne({ userName: req.body.userName });

    if (existingUsr) {
      res.status(400).send("email already taken");
    }

    const user = await usr.create(req.body);

    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.post("/login", passport.authenticate("local"), async (req, res) => {
  res.send("success");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
