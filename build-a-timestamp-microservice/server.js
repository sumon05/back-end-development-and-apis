import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Do not change code above this line

const handleDate = (req, res) => {
  const { date } = req.params;

  // No date → current time
  if (!date) {
    const now = new Date();

    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Date is a Unix timestamp
  const parsedDate = /^\d+$/.test(date)
    ? new Date(Number(date))
    : new Date(date);

  // Invalid date
  if (isNaN(parsedDate.getTime())) {
    return res.json({
      error: "Invalid Date"
    });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
};

app.get('/api/', handleDate);
app.get('/api/:date', handleDate);
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
