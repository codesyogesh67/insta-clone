import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "@material-ui/core";
import { db } from "./firebase";
import firebase from "firebase";

export default function AddComment({ id, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection("posts")
        .doc(id)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [id]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(id).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div>
      <div className="addcomment__commentBox">
        {comments.map((comment) => (
          <div key={comment.id} className="addComment__comment">
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          </div>
        ))}
      </div>
      {user ? (
        <form className="addComment__postBox">
          <input
            className="addComment__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button className="addComment__button" onClick={postComment}>
            Post
          </button>
        </form>
      ) : (
        <p></p>
      )}
    </div>
  );
}
