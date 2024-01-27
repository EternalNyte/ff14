import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface JobItem {
  id: number;
  label: string;
  short_name: string;
}

interface ToggleButtonListProps {
  jobs: JobItem[];
  selectedJobIds: number[];
  onToggle: (jobId: number) => void;
}

const ToggleButtonList: React.FC<ToggleButtonListProps> = ({ jobs, selectedJobIds, onToggle }) => {
  return (
    <div className="btn-group" role="group">
      {jobs.map((job) => (
        <button
          key={job.id}
          className={`btn btn-secondary ${selectedJobIds.includes(job.id) ? 'bg-primary' : 'bg-secondary'}`}
          onClick={() => onToggle(job.id)}
          style={{ marginRight: '5px', marginBottom: '5px' }}
        >
          {job.short_name}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtonList;

