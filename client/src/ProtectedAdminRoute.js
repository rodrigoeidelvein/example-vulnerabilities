import { Redirect } from "@reach/router";
import Logout from "./Logout";
import Layout from "./Layout";
import { getUser } from "./util";

const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
    const user = getUser();

    const isLogged = !!user;

    if (!isLogged) {
        return <Redirect from="" to="login" noThrow />;
    }

    const isAdmin = user.tipo === "admin";

    return isLogged && isAdmin ? (
        <Layout>
            Administrador logado: {user.usuario}
            <Component {...rest} />
            <Logout />
        </Layout>
    ) : (
        <Redirect to="/" noThrow />
    );
};

export default ProtectedAdminRoute;
