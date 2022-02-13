import { useQuery } from "@apollo/client";
import { useState, useContext } from "react";
import ChildContext from "../../context/ChildContext";
import { GET_USER_PROFILE_INFO } from "../../graphql/queries";
import { useRealmApp } from "../../RealmApp";
import LoadingScreen from "./LoadingScreen";
import "./Header.scss";

function ChildSubmenu() {

    const [currentChildId, setCurrentChild] = useState(localStorage.getItem('currentChildId'));
    const { setCurrentChildId } = useContext(ChildContext);
    const app = useRealmApp();

    const { loading, error, data } = useQuery(GET_USER_PROFILE_INFO, {
        variables: {
            userId: app.currentUser.id,
        }
    });

    if (loading || error) return <LoadingScreen />;
    const user = data.user;

    const switchChild = (childId: any) => {
        setCurrentChildId(childId);
        localStorage.setItem('currentChildId', childId);
    };

    return (
        <>
            {
                user.children.map((element: any) => {
                    return <div onClick={() => switchChild(element._id)} key={element._id} className={currentChildId === element._id ? "dropdown-item profile-link current-child" : "dropdown-item profile-link"}>
                        {element.name}
                    </div>
                })
            }
        </>
    )
}

export default ChildSubmenu;