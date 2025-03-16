const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
const { OAuth2Client } = require('google-auth-library');


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
let events = [];

// Event Schema
const CLIENT_ID = "1069600965731-i4gq6oojr22640a80m1uic2jn128jrl7.apps.googleusercontent.com"; // Your Google Client ID


const client = new OAuth2Client(CLIENT_ID);


async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    console.error('Error verifying Google token:', error);
    return null;
  }
}

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
console.log('ayaa hai')
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const payload = await verifyGoogleToken(token);

  if (payload) {
    
    const { email, name, picture } = payload;
    const user = { email, name, picture };

    res.json({ user, message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
});
// const Event = mongoose.model("Event", eventSchema);

// Routes
// Get all events
app.get("/api/events", async (req, res) => {
  try {
    // const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Add a new event
app.post("/api/events", async (req, res) => {
  const { title, date, description } = req.body;
  try {
    const newEvent = events.push({ title, date, description });
    // await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event" });
  }
});

app.get("/",(req,res)=>{
  return res.json({"status":"working"})
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});