import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import copy from 'clipboard-copy';

interface CopyCSVToClipboardButtonProps {
  data: (number | string)[][];
}

const CopyCSVToClipboardButton: React.FC<CopyCSVToClipboardButtonProps> = ({ data }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    const formattedData = data.map((row) => row.join('\t')).join('\n');
    try {
      await copy(formattedData);
      setIsCopied(true);
      // Reset the "Copied" state after a short delay
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard', error);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleCopyClick}>
      <FontAwesomeIcon icon={faClipboard} style={{ marginRight: '0.5em' }} />
      {isCopied ? 'Copied!' : 'Copy to Clipboard'}
    </button>
  );
};

export default CopyCSVToClipboardButton;

