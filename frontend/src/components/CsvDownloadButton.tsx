import React from 'react';
import Papa from 'papaparse';
import { BsCloudDownload } from 'react-icons/bs';

interface CSVDownloadButtonProps {
  data: Array<Array<string | number>>;
}

const CSVDownloadButton: React.FC<CSVDownloadButtonProps> = ({ data }) => {
  const handleDownload = () => {
    // Convert supplied data to CSV format
    const csv = Papa.unparse(data);

    // Create a Blob with the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Create a download link
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'selected_job_abilities.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Your browser does not support the download functionality. Please try a different browser.');
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleDownload}>
      <BsCloudDownload /> CSV
    </button>
  );
};

export default CSVDownloadButton;

