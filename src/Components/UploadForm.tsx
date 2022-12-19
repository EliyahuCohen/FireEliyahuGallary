import React, {
  FormEvent,
  HtmlHTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const changeHandler = (e: any) => {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setError("");
      setFile(selected);
    } else {
      setError("Please select image file (png ,jpeg ,jpg)");
    }
  };
  return (
    <div>
      <form>
        <label>
          <input type="file" onChange={changeHandler} />
          <span>+</span>
        </label>
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{file.name}</div>}
          {file && <ProgressBar file={file} setFile={setFile} />}
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
