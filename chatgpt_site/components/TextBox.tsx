import React, { ChangeEvent } from 'react';

interface TextBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ value, onChange }) => {
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <textarea
        value={value}
        onChange={handleInputChange}
        placeholder="Enter text..."
        style={{ width: '60%', minHeight: '100px', maxHeight: '200px' }} // Adjust the height as desired
        className="text-input" // Add a class name for custom styling
      />
    </div>
  );
};

export default TextBox;
