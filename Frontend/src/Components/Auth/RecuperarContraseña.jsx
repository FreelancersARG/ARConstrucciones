import { useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAuthStore from "../../Context/useAuthStore";
import Error from "../Layout/Error";
import 'bootstrap-icons/font/bootstrap-icons.css';
import WhatsAppButton from "../../Components/Layout/Whatsapp/WhatsAppButton";
import { URL_USUARIOS } from "../../Constants/endpoints-API";

const RecuperarContraseña = () => {
  const token = useAuthStore((state) => state.token);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const form = useRef();

  const validarCorreo = async (email) => {
    try {
      const response = await axios.get(`${URL_USUARIOS}`);
      const empleados = response.data; // Asume que la respuesta contiene un array de empleados
      return empleados.some((empleado) => empleado.mailUsuario === email); // Valida el campo correcto
    } catch (error) {
      console.error("Error al validar el correo electrónico:", error);
      Swal.fire({
        icon: "error",
        title: "Error al validar el correo",
        text: "No se pudo validar el correo electrónico. Intente más tarde.",
      });
      return false;
    }
  };

  const onSubmit = async (data) => {
    const emailValido = await validarCorreo(data.email); // Usa "email" en lugar de "mailUsuario"
    if (!emailValido) {
      Swal.fire({
        icon: "error",
        title: "Correo no registrado",
        text: "El correo ingresado no pertenece a un empleado registrado.",
      });
      return;
    }

    // Enviar el correo al usuario con la confirmación
    emailjs
      .sendForm('service_dsdwt6f', 'template_b4f9l48', form.current, {
        publicKey: '8dmLv8MowtYvWjLXg',
      })
      .then(
        () => {
          Swal.fire({
            title: "Mensaje enviado!",
            text: "Te contactaré pronto para continuar con la recuperación de tu contraseña.",
            icon: "success",
          });
          reset();
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Problemas con el envío!",
            text: "Estamos trabajando para solucionarlo.",
          });
        }
      );

  };

  return (
    <>
      {!token ? (
        <div id="contacto" className="main-section">
          <div className="form-area">
            <div className="container p-md-3 p-md-5 rounded my-5">
              <Row className="single-form g-0">
                <Col lg={6}>
                  <div className="izquierda-contacto">
                    <h2>
                      <span>Recuperar Contraseña</span>
                      <br />
                    </h2>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="derecha-contacto">
                    <i className="bi bi-caret-left-fill"></i>
                    <Form
                      ref={form}
                      onSubmit={handleSubmit(onSubmit)}
                      className="formularioContacto"
                    >
                      <Form.Group
                        className="mb-3"
                        controlId="formularioContacto.ControlInput1"
                      >
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="nombre@mail.com"
                          name="email"
                          required
                          maxLength={74}
                          {...register("email", {
                            required: true,
                            maxLength: 74,
                            pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/i,
                          })}
                        />
                        {errors.email?.type === "required" && (
                          <p className="text-danger">El campo email es requerido</p>
                        )}
                        {errors.email?.type === "pattern" && (
                          <p className="text-danger">
                            El formato del email es incorrecto
                          </p>
                        )}
                      </Form.Group>
                      <Button type="submit" variant="success border-3 shadow fs-3">
                        Enviar
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <WhatsAppButton />
        </div>
      ) : (
        <Error />
      )}
    </>
  );
};

export default RecuperarContraseña;
