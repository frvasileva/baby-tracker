import React from "react";
import { useRealmApp } from "../../../RealmApp";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";


export const Login = () => {
    const app = useRealmApp();
    let history = useHistory();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    // Keep track of input validation/errors
    const [error, setError] = React.useState({});

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        await app.logIn(email, password).then(() => {
            history.push("/");
        });
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <h1>Login</h1>

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
                                <label htmlFor="name">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    autoComplete="current-password"
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
                                    Login
                                </button>
                            </div>
                        </form>

                        <Link to="/register" className="navbar-brand">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
