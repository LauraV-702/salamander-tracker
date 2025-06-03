import React, { useState } from 'react';

// Higher-Order Component (HOC) - adds job processing status tracking
export default function JobStatus(WrappedComponent) {
  return function WithJobStatusWrapper(props) {
    const [jobStatus, setJobStatus] = useState(null);
    const [resultLink, setResultLink] = useState(null);

    const handleProcess = async ({ filename, color, threshold }) => {
      try {
        // Send POST request to start processing with filename, color, and threshold
        const res = await fetch(
          `http://localhost:3001/process/${filename}?targetColor=${color.replace('#', '')}&threshold=${threshold}`,
          { method: 'POST' }
        );
        const json = await res.json();
        setJobStatus('Processing...'); // Update status to show processing started
        pollStatus(json.jobId);
      } catch (err) {
        setJobStatus('Error submitting job');
      }
    };

    const pollStatus = async (jobId) => {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`http://localhost:3001/process/${jobId}/status`);
          const json = await res.json();
          if (json.status === 'done') {
            clearInterval(interval);
            setJobStatus('Done!');
            setResultLink(`http://localhost:3001${json.result}`);
          } else if (json.status === 'error') {
            clearInterval(interval);
            setJobStatus('Error: ' + json.error);
          }
        } catch (err) {
          clearInterval(interval);
          setJobStatus('Error checking status');
        }
      }, 1000);
    };

    return (
      <WrappedComponent
        {...props} // pass down all original props
        jobStatus={jobStatus} // pass down current job status string
        resultLink={resultLink} // pass down CSV download URL if available
        onProcess={handleProcess} // pass down function to start processing
      />
    );
  };
}
