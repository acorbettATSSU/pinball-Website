// IssueCard.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const IssueCard = ({ issue, onUpdateStatus }) => {
  const [newStatus, setNewStatus] = useState(issue.status);

  const handleStatusChange = async () => {
    if (!issue.id && !issue._id) {
      console.error('Issue id is undefined', issue);
      return;
    }

    const issueId = issue.id || issue._id;

    console.log('Updating status for issue with ID:', issueId);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/issue/updateIssue/${issueId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machine: issue.machine,
          issue: issue.issue,
          name: issue.name,
          status: newStatus,
        }),
      });

      if (response.ok) {
        onUpdateStatus();
        console.log('Status updated successfully');
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{issue.name}</h5>
          <p className="card-text">Issue: {issue.issue}</p>
          <p className="card-text">Machine: {issue.machine}</p>
          <p className="card-text">Status: {issue.status}</p>
          <div className="mb-3">
            <label htmlFor={`statusDropdown${issue.id || issue._id}`} className="form-label">Change Status:</label>
            <select
              id={`statusDropdown${issue.id || issue._id}`}
              className="form-select"
              onChange={(e) => setNewStatus(e.target.value)}
              value={newStatus}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleStatusChange}>Update Status</button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
