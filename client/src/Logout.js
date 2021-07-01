import { useNavigate } from "@reach/router";
import { removeUser } from "./util";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeUser();
        navigate("/login", { replace: true });
    };

    return (
        <button
            onClick={handleLogout}
            type="button"
            className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
        >
            Sair
        </button>
    );
};

export default Logout;
