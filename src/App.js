import React from 'react';
import ImageUploader from './components/ImageUploader';
import './App.css';

function App() {
  return (
    <div className="App">
      <ImageUploader requestURL={'http://192.168.1.2:4000/photos'} requestDataName={'photos'}  />
    </div>
  );
}

export default App;


