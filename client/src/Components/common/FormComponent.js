// FormComponent.js
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const FormComponent = ({ fields, apiUrl, initialData, titleHeading, submitType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData || {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      
      const url = `${process.env.REACT_APP_BACKEND}/${apiUrl}`;
      const response = await fetch(url, {
        method: submitType,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Check if "Will decide later" is selected and omit sending teacher ID in that case
          teacher: formData.teacher === 'Will decide later' ? null : formData.teacher
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success('Form submitted successfully');
        navigate('/');
      } else {
        setError('Failed to submit form');
        throw new Error(responseData.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message || 'Error submitting form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="max-w-md w-full p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">{titleHeading}</h2>
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={field.name} className="block text-gray-700">
              {field.label}
            </label>
            {field.type === 'dropdown' ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className="mt-2 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className="mt-2 px-3 py-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            )}
          </div>
        ))}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-background-yellow text-black font-semibold py-2 px-4 rounded shadow focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
