import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHILD_PROFILE } from "../../../graphql/queries";
import { Layout } from "../../layout/Layout";
import LoadingScreen from "../../layout/LoadingScreen";

export const ChildProfile = () => {

    let { id } = useParams() as any;

    const { loading, error, data } = useQuery(GET_CHILD_PROFILE, {
        variables: {
            _id: id,
        },
    });

    if (loading || error) return <LoadingScreen />;

    const child = data.childProfile;

    return (<Layout>
        Child profile
        <br></br>

        <p>  {child.name}</p>
        <p>  {child.birthdate}</p>
        <p>  {child.sex}</p>

    </Layout>)
}