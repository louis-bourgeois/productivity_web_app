import express from "express";

// Configuration
const PORT = 3000;
const language = "en";
const fName = "Louis";
const lName = "Bourgeois";
const isSubscribed = true;

// Helper function to get days by language
function getDaysByLanguage(language) {
  return language === "en"
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
}

const DAYS = getDaysByLanguage(language);

// Express setup
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/register", (req, res) => res.render("register"));
app.post("/register", (req, res) => {
  // TODO: Implement logic here
});

// HERE: Sending data to 'currently.ejs'
app.get("/currently", (req, res) => res.render("currently", getCurrentInfo()));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Helper function to get current info
function getCurrentInfo() {
  const week = [];
  let currentDate;
  let hours = new Date().getHours(); // Added this line

  for (let i = 0; i < 7; i++) {
    currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    const dayInfo = getDayInfo(currentDate);
    week.push(dayInfo);
  }

  const moment = getDayMoment(hours, language);
  return {
    isSubscribed,
    fName,
    lName,
    fullName: fName + "" + lName,
    timeInfos: week,
    moment,
    language,
  }; // 'language' is part of the returned object
}

// Helper function to get day info
function getDayInfo(date) {
  const dayNumber = date.getDate();
  const dayName = DAYS[date.getDay()];
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const time = `${String(hours).padStart(2, "0")}:${minutes}`;
  return { dayNumber, dayName, time };
}

// Helper function to get day moment
function getDayMoment(hours, language) {
  let moments = {
    en: {
      evening: "Good Evening,",
      night: "Good Night,",
      morning: "Good Morning,",
      afternoon: "Good Afternoon,",
      meal: "Bon Appétit,",
    },
    fr: {
      evening: "Bonsoir,",
      night: "Bonne nuit,",
      morning: "Bonjour,",
      afternoon: "Bonjour,",
      meal: "Bon Appétit,",
    },
  };

  if (19 <= hours && hours < 23) return moments[language].evening;
  if (hours >= 23 || hours < 6) return moments[language].night;
  if (6 <= hours && hours < 12) return moments[language].morning;
  if (12 <= hours && hours < 13) return moments[language].meal; // Added this line
  if (13 <= hours && hours < 19) return moments[language].afternoon;
  return "Hello,";
}
