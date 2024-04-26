const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GEMINI_API_KEY, GEMINI_ENDPOINT } = require('./config');

router.post('/submit-complaint', async (req, res) => {
  const { complaintText, type, urgency, department } = req.body;
  try {
    const response = await axios.post(`${GEMINI_ENDPOINT}/generateContent`, {
      contents: [{
        parts: [{
          text: `Summarize and categorize this complaint: ${complaintText} Type: ${type}, Urgency: ${urgency}, Department: ${department}`
        }]
      }],
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json({ report: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the complaint' });
  }
});

module.exports = router;
