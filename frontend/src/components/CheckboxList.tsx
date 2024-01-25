import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CheckboxItem {
  id: number;
  label: string;
  short_name: string;
}

interface CheckboxListProps {
  data: CheckboxItem[];
}

const CheckboxList: React.FC<CheckboxListProps> = ({ data }) => {
  // State to track checked checkboxes
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  // Function to handle checkbox change
  const handleCheckboxChange = (itemId: number) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
    // Perform your custom action based on checkbox state
    // For example, you can handle enabling or disabling something
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="form-check">
          <input
            type="checkbox"
            className="form-check-input custom-checkbox"
            id={`checkbox-${item.id}`}
            checked={checkedItems[item.id] || false}
            onChange={() => handleCheckboxChange(item.id)}
          />
          <label className="form-check-label" htmlFor={`checkbox-${item.id}`}>{item.short_name}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;

