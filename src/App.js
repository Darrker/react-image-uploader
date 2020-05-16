import React from 'react';
import ImageUploader from './components/ImageUploader';
import './components/style/app.scss';

function App() {
  return (
    <div className="App">
      <h3 className="App__title">Dodawaj, usuwaj i sortuj zdjęcia do woli!</h3>
      <ImageUploader requestURL={'http://192.168.1.2:4000/photos'} requestDataName={'photos'}  />
    </div>
  );
}

export default App;


