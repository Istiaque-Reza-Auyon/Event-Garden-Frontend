"use client"

import React, { useState } from 'react';

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    // Get the selected file from the input element
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    // Implement file upload logic here (e.g., send the file to a server using Axios)
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Example: Send formData to the server using Axios
      // axios.post('/upload', formData)
      //   .then(response => {
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.error('Error uploading file:', error);
      //   });

      // Reset selected file state after upload
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUploadComponent;
