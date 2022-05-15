import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../queries.js";

const Settings = (props) => {
  const { isValidUser, user } = useContext(AuthContext);
  const [updateUser] = useMutation(queries.UPDATE_USER);

  let userUid = "";
  if (isValidUser) {
    userUid = user.uid;
  }

  let { loading, error, data } = useQuery(queries.FETCH_USER, {
    fetchPolicy: "cache-and-network",
    variables: { _id: userUid },
  });

  let errorMap = {
    firstName: "",
    lastName: "",
    aboutme: "",
  };

  const validateForm = (e) => {
    let valid = true;
    Object.values(e).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const [errors, setErrors] = useState(errorMap);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "firstName":
        setErrors({
          ...errors,
          firstName:
            value.length > 0 && value.length < 2
              ? "Full Name must be at least 2 characters long!"
              : "",
        });
        break;

      case "lastName":
        setErrors({
          ...errors,
          lastName:
            value.length > 0 && value.length < 2
              ? "Last Name must be at least 2 characters long!"
              : "",
        });
        break;

      case "aboutme":
        setErrors({
          ...errors,
          aboutme:
            value.length > 0 && value.length < 15
              ? "About me must be at least 15 characters long!"
              : "",
        });

        break;
      default:
        break;
    }
    return;
  };

  return (
    <div className="text-3xl  text-center h-96 ">
      <br />
      <header className="text-black-700 ">Update Your Profile</header>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validateForm(errors)) {
              let fn =
                document.getElementById("firstName").value === ""
                  ? data.fetchUser.firstname
                  : document.getElementById("firstName").value;
              let ln =
                document.getElementById("lastName").value === ""
                  ? data.fetchUser.lastname
                  : document.getElementById("lastName").value;
              let about =
                document.getElementById("aboutme").value === ""
                  ? data.fetchUser.about_me
                  : document.getElementById("aboutme").value;
              updateUser({
                variables: {
                  _id: userUid,
                  firstname: fn,
                  lastname: ln,
                  about_me: about,
                },
              });
              document.getElementById("firstName").value = "";
              document.getElementById("lastName").value = "";
              document.getElementById("aboutme").value = "";
              alert("Profile updated!");
              window.location = "/";
            } else {
              alert("Form Invalid!");
            }
          }}
        >
          <div>
            <label
              htmlFor="firstName"
              className="block mb-3 text-sm font-semibold text-gray-500 required"
            >
              First Name
            </label>
            <input
              name="firstName"
              id="firstName"
              type="text"
              placeholder={data.fetchUser.firstname}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <label
              htmlFor="lastName"
              className="block mb-3 text-sm font-semibold text-gray-500 required"
            >
              Last Name
            </label>
            <input
              name="lastName"
              id="lastName"
              type="text"
              placeholder={data.fetchUser.lastname}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <label
              htmlFor="about me"
              className="block mb-3 text-sm font-semibold text-gray-500 required"
            >
              About Me
            </label>
            <input
              name="aboutme"
              id="aboutme"
              type="text"
              placeholder={data.fetchUser.about_me}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
