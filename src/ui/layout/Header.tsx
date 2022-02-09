import { useState } from "react";
import { Link } from "react-router-dom";
import { useRealmApp } from "../../RealmApp";
import ChildSubmenu from "./ChildSubmenu";

import "./Header.scss";

export const Header = (props: any) => {
    const app = useRealmApp();
    const [isLoggedIn, setIsLoggedIn] = useState(app.currentUser != null);
    var defaultUserOrganizationId = "";

    if (
        app.currentUser != null &&
        app.currentUser.customData.organizations != null
    ) {
        defaultUserOrganizationId =
            app.currentUser.customData.organizations[0].$oid;
    }

    const logout = () => {
        app.currentUser.logOut().then(() => {
            for (var a in localStorage) {
                localStorage.removeItem(a);
            }
        });
    };


    return (
        <div className="menu-wrapper">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-custom navbar-fixed-top main-menu">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <i className="fas fa-baby-carriage"></i>    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">
                                    Видове храни
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/food-list" className="nav-link">
                                    Въведени храни
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/growth-tracker" className="nav-link">
                                    Мерки
                                </Link>
                            </li>
                        </ul>
                        {!isLoggedIn ? (
                            <ul className="nav navbar-nav navbar-right">
                                <li className="nav-item">
                                    <Link to="/Login" className="nav-link">
                                        вход
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        регистрация
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="nav justify-content-end">
                                <li>
                                    <div className="dropdown">
                                        <button
                                            className="btn dropdown-toggle profile-button"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i className="fas fa-user-alt"></i>
                                        </button>
                                        <div
                                            className="dropdown-menu dropdown-menu-right"
                                            aria-labelledby="dropdownMenuButton"
                                        >
                                            <div>
                                                <Link
                                                    to={"/user/profile"}
                                                    className="dropdown-item profile-link"
                                                >
                                                    Профил
                                                </Link>
                                                <ChildSubmenu />
                                                <hr />
                                                <Link
                                                    to={
                                                        "/campaign/by-organization/" +
                                                        defaultUserOrganizationId
                                                    }
                                                    className="dropdown-item profile-link"
                                                >
                                                    Настройки
                                                </Link>
                                                <Link
                                                    to={"/admin/create-source"}
                                                    className="dropdown-item profile-link"
                                                >
                                                    Добави храна
                                                </Link>
                                                <Link
                                                    to={"/create-baby-profile"}
                                                    className="dropdown-item profile-link"
                                                >
                                                    Добави дете
                                                </Link>
                                                <hr />
                                                <button
                                                    onClick={logout}
                                                    className="dropdown-item profile-link"
                                                >
                                                    Log out
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};
