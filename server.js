const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
var cors = require("cors");
const path = require("path");

// Importing User Mo
// const User = require("./models/user");
// Importing Authentication Routes
const authRoutes = require("./routes/auth_routes");
const userRoutes = require("./routes/user_routes");

const MONGODB_URI = `mongodb+srv://ayush:HE5DTxkD29rshQGj@nodelearning-lcptb.mongodb.net/test?retryWrites=true&w=majority`;
// Importing Passport Middlewares
require("./auth/passport")(passport);
// Adding a new Mingodb Stores
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

app.use(express.static(path.join(__dirname, "dist")));

//BODYPARSER MIDDLEWARES
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "My Secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    },
    store: store,
    saveUninitialized: false,
    resave: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/routes/auth", authRoutes);
app.use("/routes/user", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(db => {
    console.log("Connected to DB" + db);
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => {
    console.log(err);
  });
