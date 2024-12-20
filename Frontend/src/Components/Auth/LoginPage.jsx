import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../Context/useAuthStore";
import { URL_LOGIN } from "../../Constants/endpoints-API";
import Swal from "sweetalert2";
import './login.css';
import { HOME_SISTEMA_GESTION } from "../../Routes/routes";
import Error from "../Layout/Error";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [passwordUsuario, setPasswordUsuario] = useState("");
  const [rolUsuario, setrolUsuario] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const token = useAuthStore((state) => state.token);

  const setToken = useAuthStore((state) => state.setToken);
  const setUserRole = useAuthStore((state) => state.setUserRole);
  const setUserName = useAuthStore((state) => state.setUserName);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL_LOGIN, {
        nombreUsuario,
        rolUsuario,
        passwordUsuario,
      });
      setToken(response.data.token);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      const decodedToken = JSON.parse(atob(response.data.token.split(".")[1]));
      setUserRole(decodedToken.role);
      setrolUsuario(decodedToken.role);
      setUserName(nombreUsuario); // Guardar el nombre de usuario en el estado global

      navigate(HOME_SISTEMA_GESTION);
    } catch (error) {
      console.error("Login incorrecto:", error);
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "Usuario o contraseña incorrectos",
        timer: 3000, // Tiempo en milisegundos para que se cierre automáticamente
        showConfirmButton: false,
        toast: true,
        position: "top-center",
      });
    }
  };

  return (
    <>
      {!token ? (
        <div className="loginContainer">
          <aside className="loginLeft">
            <div className="loginLeftText">
              <p></p>
            </div>
          </aside>

          <aside className="loginRight">
            <div className="formContainer">
              <h2>Iniciar sesión</h2>
              <p>Te hemos echado de menos, inicia sesión para continuar.</p>
              <form className="loginForm" onSubmit={handleSubmit}>
                <div className="formControl">
                  <label htmlFor="username">Nombre de Usuario</label>
                  <input
                    type="text"
                    placeholder="Nombre de usuario"
                    autoComplete="username"
                    onChange={(e) => setNombreUsuario(e.target.value.trim())}
                    required
                  ></input>
                </div>
                <div className="formControl relative">
                  <label htmlFor="password">Contraseña</label>
                  <div className="passwordContainer">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      onChange={(e) => setPasswordUsuario(e.target.value.trim())}
                      required
                    ></input>
                    <button
                      type="button"
                      className="showPasswordBtn mt-4 fs-3 ms-auto absolute top-4 right-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="loginSubmitBtn"
                  disabled={!nombreUsuario || !passwordUsuario}
                >
                  Ingresar
                </button>
                <div className="px-4 py-4 mt-5 recuperar-pass">
                  <div className="text-sm text-center">
                    Olvidaste tu contraseña?
                    <Link
                      to={"/area-empleados/RecuperarContraseña"}
                      className="font-medium underline hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {" "}
                      Recuperarla
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </aside>
        </div>
      ) : (
        <Error />
      )}
    </>
  );
};

export default LoginPage;