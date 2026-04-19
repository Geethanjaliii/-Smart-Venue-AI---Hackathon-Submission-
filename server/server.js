const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const BASE_PORT = Number(process.env.PORT) || 4017;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client")));

// Mock Data
let crowdData = [
  { zone: "A", density: "high" },
  { zone: "B", density: "medium" },
  { zone: "C", density: "low" }
];

let queueData = [
  { stall: "Food A", time: 15 },
  { stall: "Food B", time: 5 }
];

// Routes
app.get("/api/crowd", (req, res) => {
  res.json(crowdData);
});

app.get("/api/queue", (req, res) => {
  res.json(queueData);
}); 

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.get("/api/suggest/:zone", (req, res) => {
  const zone = req.params.zone;

  if (zone === "A") return res.json({ msg: "Avoid Zone A, go to Zone C" });
  if (zone === "B") return res.json({ msg: "Moderate crowd" });

  res.json({ msg: "All clear" });
});

app.post("/api/update", (req, res) => {
  crowdData = req.body;
  res.json({ msg: "Updated successfully" });
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on("error", error => {
    if (error.code === "EADDRINUSE") {
      startServer(port + 1);
      return;
    }

    throw error;
  });
}

startServer(BASE_PORT);