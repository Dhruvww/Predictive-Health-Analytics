const { configDotenv } = require("dotenv");
const express = require("express");
const { register } = require("./apis/register");
const { login } = require("./apis/login");
const { Kidney } = require("./ML/Kidney");
const { Heart } = require("./ML/Heart");
const app = express();
const cors = require("cors");
const { diabeties } = require("./apis/diabeties");
const { bp } = require("./apis/bp");
const session = require("express-session");
const { logout } = require("./apis/logout");
const { Heart_user } = require("./fetch_user_data/Heart_user");
const { fetch_user_data } = require("./fetch_user_data/fetch_user_data");
const { upload: brainUpload, BrainTumor } = require("./ML/Brain");
const { Pneumonia, upload: pneumoniaUpload } = require("./ML/pneumonia");
const { doctor } = require("./apis/doctor");
const { doctor_data } = require("./fetch_user_data/doctor_data");
const { appointment } = require("./apis/appointment");
const { fetch_appointment } = require("./fetch_user_data/fetch_appointment");
require("./jobs/reminderJob");
require("dotenv").config();



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(session({
  secret: "secret", resave: false, saveUninitialized: false, cookie: {
    secure: false,           
    httpOnly: true,
    sameSite: 'lax'         
  }
}));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Started",
  });
})
app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      message: `Welcome ${req.session.user.username}`,
      session: req.session.user
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});
app.post("/register", register);
app.post("/login", login);
app.post("/kidney", Kidney);
app.post("/Heart", Heart);
app.post("/diabeties", diabeties);
app.post("/bp", bp);
app.post("/logout", logout);
app.get("/Heart_user",Heart_user);
app.get("/History",fetch_user_data);
app.get('/api/user', (req, res) => {
    if (req.session && req.session.user) {
        return res.json({ username: req.session.user.username });
    } else {
        return res.status(401).json({ message: 'Not logged in' });
    }
});
app.post("/brain_tumor", brainUpload.single("image_file"), BrainTumor);
app.post("/pneumonia", pneumoniaUpload.single("image"), Pneumonia);
app.post("/doctor",doctor);
app.get("/doctor_data",doctor_data);
app.post("/appointment",appointment);
app.get("/fetch_appointment",fetch_appointment);


app.listen(process.env.PORT);