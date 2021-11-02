import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE_INFO } from "../../../graphql/queries";
import { useRealmApp } from "../../../RealmApp";
import { Layout } from "../../layout/Layout";
import LoadingScreen from "../../layout/LoadingScreen";

export const UserProfile = () => {

    const app = useRealmApp();

    const { loading, error, data } = useQuery(GET_USER_PROFILE_INFO, {
        variables: {
            userId: app.currentUser.id,
        },
    });

    if (loading || error) return <LoadingScreen />;

    const user = data.user;
    console.log("user data", data);
    return (<Layout>User profile
        {user.name}
        {user.children[0].name}
        {user.children[1].name}
    </Layout>)
}