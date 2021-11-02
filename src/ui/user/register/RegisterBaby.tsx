import { useMutation } from "@apollo/client";
import React from "react";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { useHistory } from "react-router-dom";
import { INSERT_CHILD_PROFILE } from "../../../graphql/queries";
import { useRealmApp } from "../../../RealmApp";
import { Layout } from "../../layout/Layout";
import "./RegisterBaby.scss";

export const RegisterBaby = () => {

    const app = useRealmApp();
    let history = useHistory();

    const [name, setName] = React.useState("");
    const [sex, setSex] = React.useState("");
    const [birthdate, setBirthDate] = React.useState();

    const [insertChildProfile] = useMutation(INSERT_CHILD_PROFILE);

    const dtInputProps = {
        placeholder: 'Изберете дата',
        disabled: false,
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        var profile = {
            name,
            sex,
            birthdate,
            createdOn: new Date(),
            parent: { link: app.currentUser.id }
        }

        insertChildProfile({
            variables: {
                input: profile,
            },
        }).then(() => {
            history.push("/");
        });

        console.log("profile", profile);
    };

    const changeDate = (event: any) => {
        console.log(event.toDate()) // Tue Nov 24 2020 00:00:00 GMT+0400 (Gulf Standard Time)
        console.log(event.format("DD-MM-YYYY")) //24-11-2020
        setBirthDate(event.toDate());
    }

    return <Layout>
        Добави дете:
        <hr />
        <div className="row">
            <div className="col-8">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Дата на раждане:</label>
                        <Datetime inputProps={dtInputProps} dateFormat="MM-DD-YYYY" onChange={changeDate} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Име:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Име"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Пол:</label>
                        <div className="row">
                            <div className="col-6">
                                <div className="sex-wrapper male" onClick={(e) => {
                                    setSex("male");
                                }}>
                                    <i className="fas fa-male"></i>
                                    <p>момче</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="sex-wrapper female" onClick={(e) => {
                                    setSex("female");
                                }}>
                                    <i className="fas fa-female"></i>
                                    <p>момиче</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block main-action-btn"
                        >
                            Добави дете
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
}