import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface JobItem {
  id: number;
  label: string;
  short_name: string;
}

interface ToggleButtonListProps {
  jobs: JobItem[];
}

const ToggleButtonList: React.FC<ToggleButtonListProps> = ({ jobs }) => {
  const [selectedJobs, setSelectedJobs] = useState<JobItem[]>([]);

  const handleToggle = (job: JobItem) => {
    const updatedJobs = selectedJobs.includes(job)
      ? selectedJobs.filter((selected) => selected !== job)
      : [...selectedJobs, job];

    setSelectedJobs(updatedJobs);
  };

  return (
    <div>
      {jobs.map((job) => (
        <button
          key={job.id}
          className={`btn btn-secondary ${selectedJobs.includes(job) ? 'bg-primary' : 'bg-secondary'}`}
          onClick={() => handleToggle(job)}
          style={{ marginRight: '5px', marginBottom: '5px' }}
        >
          {job.short_name}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtonList;

