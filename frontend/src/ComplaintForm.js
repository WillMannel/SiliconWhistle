import React, { useState } from 'react';
import axios from 'axios';

function ComplaintForm() {
  const [complaintText, setComplaintText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/submit-complaint', {
        complaintText
      });
      alert('Complaint submitted successfully: ' + response.data.report);
    } catch (error) {
      alert('Failed to submit complaint');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={complaintText}
        onChange={e => setComplaintText(e.target.value)}
        placeholder="Enter your complaint"
        required
      />
      <button type="submit">Submit Complaint</button>
    </form>
  );
}

export default ComplaintForm;
