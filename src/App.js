import React from 'react';
import ImageUploader from './components/ImageUploader';
import './components/style/app.scss';

function App() {
  return (
    <div className="App">
      <h3 className="App__title">Dodawaj, usuwaj i sortuj zdjęcia do woli!</h3>
      <ImageUploader requestURL={'http://file-uploader.taureca.com/photos'} requestDataName={'photos'}  />

      <footer className="App__footer">
        Autor R Makosz, <a href="https://github.com/Darrker/react-image-uploader">Zobacz kod na github</a>
      </footer>
    </div>
  );
}

export default App;


