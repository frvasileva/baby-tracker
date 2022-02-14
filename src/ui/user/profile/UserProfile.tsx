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

    return (
        <Layout>User profile
            <br />
            {user?.name}
            <br />
            <hr />
            <p>Children:</p>
            {
                user.children.length > 0 &&
                user.children.map((item: any) => {
                    return <p>
                        {item.name}
                    </p>
                })
            }

        </Layout>)
}