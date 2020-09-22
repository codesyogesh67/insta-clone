import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./ImageUpload.css";
import { storage, db } from "./firebase";
import firebase from "firebase";

function ImageUpload({ username }) {
  console.log("username", username);

  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [showUploadBox, setShowUploadBox] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          //Error function...
          console.log(error);
          alert(error.message);
        },
        () => {
          //complete function...
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              //post image inside db
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
              });
              console.log("image Uploaded.....");
              setProgress(0);
              setCaption("");
              setImage(null);
            });
        }
      );
    }
  };

  return (
    <div className="imageUpload">
      <h3 className="imageUpload__title">Upload Post</h3>

      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        className="imageUpload__inputText"
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        className="imageUpload__inputFile"
        type="file"
        onChange={handleChange}
      />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
