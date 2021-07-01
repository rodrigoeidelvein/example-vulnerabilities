import { Redirect } from "@reach/router";
import Logout from "./Logout";
import Layout from "./Layout";
import { getUser } from "./util";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    // Chumbado para true para fins de teste
    const user = getUser();
    const isLogged = !!user;

    return isLogged ? (
        <Layout>
            Usuario logado: {user.usuario}
            <Component {...rest} />
            <Logout />
        </Layout>
    ) : (
        <Redirect from="" to="/login" noThrow />
    );
};

export default ProtectedRoute;
