const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_user',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // Default PostgreSQL port
});

app.post('/api/notifications-policy', async (req, res) => {
  try {
    const {
      emailRemindersEnabled,
      reminderSubject,
      reminderBody,
      reminderTiming,
    } = req.body;

    await pool.query(
      'INSERT INTO notifications_policy (email_reminders_enabled, reminder_subject, reminder_body, reminder_timing) VALUES ($1, $2, $3, $4)',
      [emailRemindersEnabled, reminderSubject, reminderBody, reminderTiming]
    );

    res.json({ message: 'Notifications policy saved successfully' });
  } catch (error) {
    console.error('Error saving notifications policy:', error);
    res.status(500).json({ error: 'Failed to save notifications policy' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});