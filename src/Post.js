import React, { useState } from "react";
import "./Post.css";
import { Avatar, Modal, makeStyles } from "@material-ui/core";
import AddComment from "./AddComment";
import { db } from "./firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Post({ username, caption, imageUrl, postId, user }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const deletePost = () => {
    db.collection("posts").doc(postId).delete();
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          alt={username}
          className="post__avatar"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
        {user?.displayName === username && (
          <>
            <button
              onClick={() => setOpen(true)}
              className="post__deleteButton"
            >
              x
            </button>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper}>
                <h3>Are you sure you want to delete this post??</h3>
                <div className="post__modalButton">
                  <button onClick={deletePost}>Delete</button>
                  <button onClick={() => setOpen(false)}>Back</button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>

      {/* image */}
      <img className="post__image" src={imageUrl} />
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      {/* username + caption */}

      <AddComment id={postId} user={user} />
    </div>
  );
}

export default Post;
