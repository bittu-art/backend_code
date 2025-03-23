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

app.post('/api/event-settings', async (req, res) => {
  try {
    const {
      dateRangeType,
      dateRangeDays,
      meetingDuration,
      bufferBefore,
      bufferAfter,
      startTimeIncrement,
      inviteeBuffer,
      isSecret,
    } = req.body;

    await pool.query(
      'INSERT INTO event_settings (date_range_type, date_range_days, meeting_duration, buffer_before, buffer_after, start_time_increment, invitee_buffer, is_secret) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [dateRangeType, dateRangeDays, meetingDuration, bufferBefore, bufferAfter, startTimeIncrement, inviteeBuffer, isSecret]
    );

    res.json({ message: 'Settings saved successfully' });
  } catch (error) {
    console.error('Error saving settings:', error);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});