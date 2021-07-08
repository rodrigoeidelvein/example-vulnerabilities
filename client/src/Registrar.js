import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.jpg";
import { useNavigate, Link } from "@reach/router";
import { getUser, setUser } from "./util";

const Registrar = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = getUser();

        if (user && user.tipo === "admin") {
            navigate("/dashboard", { replace: true });
        }

        if (user && user.tipo === "usuario") {
            navigate("/", { replace: true });
        }
    }, []);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const submitLogin = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        try {
            const { data } = await axios.post("https://exemplo-vulnerabilidades.herokuapp.com/create", {
                usuario: username,
                senha: password,
                tipo: "usuario"
            });

            if (data.message) {
                setErrorMessage(data.message);
            }

            console.log(data)

            if (data.usuario) {
                const usuario = data.usuario[0];
                setUser(usuario);

                if (data.tipo === "admin") {
                    navigate("/dashboard", { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">
                    <img src={logo} alt="logo" />
                </h1>
                <form onSubmit={submitLogin}>
                    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                        <div className="px-5 py-7">
                            <div className="text-center py-2 font-bold">
                                Registrar
                            </div>
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                Usuário
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                onChange={handleUsernameChange}
                                value={username}
                            />
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">
                                Senha
                            </label>
                            <input
                                type="password"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                onChange={handlePasswordChange}
                                value={password}
                            />
                            <button
                                type="submit"
                                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">
                                    Registrar
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                            {errorMessage && (
                                <div className="text-red-500 text-center py-2">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                        <div className="py-5">
                            <div className="grid">
                                <div className="text-center whitespace-nowrap">
                                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-4 h-4 inline-block align-text-top"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <Link to="/login">
                                            <div className="inline-block ml-1 text-center">
                                                Login
                                            </div>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registrar;
