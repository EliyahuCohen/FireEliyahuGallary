import { useEffect, useState } from "react";
import "./App.css";
import ImageGrid from "./Components/ImageGrid";
import Modal from "./Components/Modal";
import Title from "./Components/Title";
import UploadForm from "./Components/UploadForm";

function App() {
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <div className="App">
     
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImage={setSelectedImage} />
      {selectedImage && (
        <Modal
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </div>
  );
}

export default App;
