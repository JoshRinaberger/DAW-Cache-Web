import React, {useEffect, useState} from 'react';

function App() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => setMessage(data.message))
  }, []);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default App;