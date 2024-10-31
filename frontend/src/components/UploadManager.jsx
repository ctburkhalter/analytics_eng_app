import React, { useState } from 'react';

function UploadManager() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          if (data.models) {
            alert('File uploaded successfully');
            // You can add additional logic here to display models
          } else {
            alert('Invalid file format');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
          alert('An error occurred while uploading the file');
        });
    }
  };

  return (
    <div>
      <h2>Upload DBT JSON File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".json" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
      </form>
    </div>
  );
}

export default UploadManager;
