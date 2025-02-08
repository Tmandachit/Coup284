import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setBackendData(data))
      .catch(error => console.error("Fetch error:", error));
  }, []);

  return (
    <div>
      <h1>Backend Data</h1>
      {backendData ? (
        <pre>{JSON.stringify(backendData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
