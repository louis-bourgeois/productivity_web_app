import express from "express";

// Configuration
const PORT = 3001;
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
        // "Thursday"
        "Friday",
        "Saturday",
      ]
    : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
}

const DAYS = getDaysByLanguage(language);

// Express setup
const app = express();

app.use(express.static("public"));
app.use(express.json()); // = 1h en moins fait gaffe la prochaine fois
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => res.render("home"));

app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => {
  // TODO: Implement logic here
});

app.get("/currently", (req, res) => {
  const currentRoute = req.url;
  const currentInfo = getCurrentInfo();
  const data = {
    ...currentInfo,
    currentRoute: currentRoute,
  };

  res.render("currently", data);
});
app.post("/currently/searchInput", (req, res) => {
  console.log(`searchInputBody: ${JSON.stringify(req.body)}`);
  const data = req.body;
  if (data) {
    console.log("Data received:", data);
    res.status(200).send("Data received");
  } else {
    console.log("Data is undefined.");
    res.status(400).send("Bad Request");
  }
});

app.post("/currently/setViewsOptions", (req, res) => {
  const viewsMenuChosenOptions = req.body;
  if (viewsMenuChosenOptions) {
    console.log("Data received:", viewsMenuChosenOptions);
    // Fais quelque chose avec cette data
    res.status(200).send("Data received");
  } else {
    console.log("Data is undefined.");
    res.status(400).send("Bad Request");
  }
});

app.get("/inbox", (req, res) => {
  const currentRoute = req.url;
  res.render("inbox", []);
});
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
    fullName: fName + " " + lName,
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
