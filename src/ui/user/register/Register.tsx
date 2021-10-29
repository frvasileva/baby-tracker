import React from "react";
import { useRealmApp } from "../../../RealmApp";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";


export const Register = () => {
  const app = useRealmApp();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  // Keep track of input validation/errors
  const [error, setError] = React.useState({});
  let history = useHistory();

  const [fields] = React.useState({
    _id: "",
    createdOn: new Date(),
    email: "",
  });

 
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await app.emailPasswordAuth.registerUser(email, password);
    await app.logIn(email, password).then((res: any) => {
      var newFields = {
        ...fields,
        _id: app.users[0].id,
        name: name,
        email: email,
        userId: app.users[0].id,
        roles: { link: "601c179366184a2118b5dea7" }, //Hardcoded - TODO - put in config
      };

    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setError((e) => ({ ...e, email: null }));
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setError((e) => ({ ...e, name: null }));
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setError((e) => ({ ...e, email: null }));
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg btn-block main-action-btn"
                >
                  Register
                </button>
              </div>
            </form>

            <Link to="/login" className="navbar-brand">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
