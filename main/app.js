import express from "express";
const app = express();
const PORT = 3000;
const language = "fr";
const fName = "Louis";
const days =
  language === "en"
    ? [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]
    : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", (req, res) => {});
app.get("/currently", (req, res) => {
  let week = [];
  let currentDate, hours;

  for (let i = 0; i < 8; i++) {
    currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i); // Incrémente la date de 'i' jours
    const dayNumber = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Les mois en JS sont indexés de 0 (janvier) à 11 (décembre)
    const year = currentDate.getFullYear();
    hours = currentDate.getHours();
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const dayName = days[currentDate.getDay()];
    let time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
    let thisDay = { dayNumber, dayName, time };
    week.push(thisDay);
  }

  let moment = "";
  function dayMoment(hours) {
    if (19 <= hours && hours < 23) {
      if (language == "en") {
        moment = "Good Evening,";
      } else {
        moment = "Bonsoir, ";
      }
    } else if (hours >= 23 || hours < 6) {
      if (language == "en") {
        moment = "Good Night,  ";
      } else if (language == "fr") {
        moment = "Bonne nuit, ";
      }
    } else if (6 <= hours && hours < 12) {
      if (language == "en") {
        moment = "Good Morning, ";
      } else if (language == "fr") {
        moment = "Bonjour, ";
      }
    } else if (13 <= hours && hours < 19) {
      if (language == "en") {
        moment = "Good Afternoon, ";
      } else if (language == "fr") {
        moment = "Bonjour, ";
      }
    } else if (language == "en" || language == "fr") {
      moment = "Bon Appétit, ";
    }
  }
  dayMoment(hours);
  console.log(week);
  res.render("currently.ejs", {
    fName: fName,
    timeInfos: week,
    moment: moment,
    language: language,
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
