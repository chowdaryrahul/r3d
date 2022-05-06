import React from "react";
import queries from "../queries.js";
import { useMutation } from "@apollo/client";

const Comments = (props) => {
  console.log(props.itemDataForComm);
  let itemData = props.itemDataForComm;
  const [commentOnItem] = useMutation(queries.ADD_COMMENT);
  const [uncommentOnItem] = useMutation(queries.REMOVE_COMMENT);

  let commentBody = null;

  commentBody = (
    <div>
      {itemData.comments.map((cmt, idx) => (
        <div key={idx}>
          {cmt.user_name}: {cmt.comt_text}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              uncommentOnItem({
                variables: {
                  _id: itemData._id,
                  user_id: cmt.user_id,
                  user_name: cmt.user_name,
                  comt_text: cmt.comt_text,
                },
              });
            }}
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(
            "comment added is: ",
            document.getElementById("commentBox").value
          );
          commentOnItem({
            variables: {
              _id: itemData._id,
              user_id: itemData.user_id,
              user_name: itemData.user_name,
              comt_text: document.getElementById("commentBox").value,
            },
          });
          document.getElementById("commentBox").value = '';
        }}
      >
        <input
          type="text"
          id="commentBox"
          name="commentBox"
          placeholder="Add Comment..."
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );

  return <div>{commentBody}</div>;
};

export default Comments;
