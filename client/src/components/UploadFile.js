// client/src/components/UploadFile.jsx

import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import "../styles/CreatePage.css";


 const GET_PHOTOS_QUERY = gql`
  query GetDetails {
    url
    name
    description
    category
  }
`;

const SINGLE_UPLOAD_MUTATION = gql`
  mutation SingleUpload($file: Upload!, $details: Details) {
    detailsUpload(file: $file, details: $details) {
    
      name
      description
    }
  }
`;

function UploadFile() {
  const [file, setFile] = useState(null);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    category: "",
    username:"Harshit",
    userId: "1622"
  });
  const [msg, setMsg] = useState("");
  const [uploadRequest, { loading, error }] = useMutation(
    SINGLE_UPLOAD_MUTATION
  );
  console.log(file);
  const uploadFile = async () => {
    setMsg("");
    if (!file) return;
    try {
      const res = await uploadRequest({
        variables: { file, details },
        refetchQueries: [{ query: GET_PHOTOS_QUERY }],
      });
      if (res.data) {
        setMsg("File upload!");
        setFile(null);
        setDetails({ name: "", description: "", category:"" });
        setTimeout(() => setMsg(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="upload-form">
      <h3 style={{color:"green", textAlignLast:"center", marginTop:"1em"}}>{msg}</h3>
      <p style={{color:"red", textAlignLast:"center", marginTop:"1em"}}>{error?.message}</p>

      <input
        type="text"
        value={details.name}
        placeholder="name"
        onChange={(e) => setDetails({ ...details, name: e.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="description"
        value={details.description}
        onChange={(e) =>
          setDetails({ ...details, description: e.target.value })
        }
      />
      <br />
      <select
        name="categories"
        value={details.category}
        onChange={(e) =>
          setDetails({ ...details, category: e.target.value })
        }
      >
        <option value=""></option>
        <option value="house">House</option>
        <option value="groceries">Groceries</option>
        <option value="schools">Schools</option>
      </select>
      <br/>
      <input
        className="App-input"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
 
      <button onClick={uploadFile}>Upload</button>
      <p>{loading && "Uploading..."}</p>
    </div>
  );
}

export default UploadFile;
