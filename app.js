const express = require("express");
require("dotenv").config();
const expressSession = require("express-session");
const {PrismaSessionStore} = require("@quixo3/prisma-session-store");
const {PrismaClient} = require("./generated/prisma");
const path = require("node:path");
const passport = require("./utils/passport.js");
const addUserToRes = require("./utils/addUserMiddleware.js");
const authRoute = require("./routes/authRoute.js");
const userPageRoute = require("./routes/userPageRoute.js");
const uploadRoute = require("./routes/uploadRoute.js");
const deleteRoute = require("./routes/deleteRoute.js");
const updateRoute = require("./routes/updateRoute.js");
const downloadRoute = require("./routes/downloadRoute.js");



const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.use(
    expressSession({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 //1 week
        },
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: 2 * 60 * 1000,
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined
            }
        ),
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(addUserToRes);


app.use("/auth", authRoute);
app.use("/upload", uploadRoute);
app.use("/update", updateRoute);
app.use("/delete", deleteRoute);
app.use("/download", downloadRoute);
app.use("/", userPageRoute);


const PORT = process.env.PORT;


app.listen(PORT, function() {console.log(`Server running on port ${PORT}!`)});

