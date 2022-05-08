import React, { useContext } from "react";
import queries from "../queries.js";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../firebase/Auth";
import { Link } from "react-router-dom";

const Comments = (props) => {
  const { isValidUser, user } = useContext(AuthContext);
  let itemData = props.itemDataForComm;
  const [commentOnItem] = useMutation(queries.ADD_COMMENT);
  const [uncommentOnItem] = useMutation(queries.REMOVE_COMMENT);

  let commentBody = null;

  if (isValidUser) {
    commentBody = (
      <div className="max-w-sm rounded  shadow-lg border p-2">
        {itemData.comments.map((cmt, idx) => (
          <div key={idx}>
            {cmt.user_name}: {cmt.comt_text}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                uncommentOnItem({
                  variables: {
                    _id: itemData._id,
                    user_id: user.uid,
                    user_name: user.displayName,
                    comt_text: cmt.comt_text,
                  },
                });
              }}
            >
              {user.uid === cmt.user_id ? (
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete Comment
                </button>
              ) : null}
            </form>
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (document.getElementById("commentBox").value !== "") {
              commentOnItem({
                variables: {
                  _id: itemData._id,
                  user_id: user.uid,
                  user_name: user.displayName,
                  comt_text: document.getElementById("commentBox").value,
                },
              });
            }
            document.getElementById("commentBox").value = "";
          }}
        >
          <input
            type="text"
            id="commentBox"
            name="commentBox"
            placeholder="Add Comment..."
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add Comment
          </button>
        </form>
      </div>
    );
  } else {
    commentBody = (
      <div className="max-w-sm rounded  shadow-lg border p-2">
        {itemData.comments.map((cmt, idx) => (
          <div key={idx}>
            {cmt.user_name}: {cmt.comt_text}
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("commentBox").value = "";
          }}
        >
          <input
            type="text"
            id="commentBox"
            name="commentBox"
            placeholder="Add Comment..."
          />
          <Link to={`/signin`}>
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add Comment
            </button>
          </Link>
        </form>
      </div>
    );
  }

  return <div>{commentBody}</div>;
};

export default Comments;
