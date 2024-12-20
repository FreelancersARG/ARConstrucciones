import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuthStore from "../../../../Context/useAuthStore";
import useRegistroStore from "../../../../Context/useRegistroStore";
import { URL_CLIENTES_CREAR } from "../../../../Constants/endpoints-API";

const CrearClientes = ({ onClienteRegistrado }) => {

  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleRegistrarCliente = () => {
    Swal.fire({
      title: "Registrar Cliente",
      html: `
            <input id="nombreCliente" placeholder="Nombre" class="swal2-input" />

            <input id="apellidoCliente" placeholder="Apellido"  class="swal2-input" />
            
            <input id="razonSocial" placeholder="Razon Social"  class="swal2-input" />

            <input id="cuil_cuit_Cliente" placeholder="Cuil / Cuit" class="swal2-input" />
            
            <input id="telefonoCliente" placeholder="Telefono" class="swal2-input" />
            
            <input id="mailCliente" placeholder="Mail" class="swal2-input" />
            
            <input id="direccionCliente" placeholder="Direccion" class="swal2-input" />            
            <br/>
            <br/>
            <label><strong>Selecciona la condición del cliente:</strong></label>
            <br/>
            <select id="condicionCliente" class="swal2-select">
            <option value="Monotributista">Monotributista</option>
            <option value="Privado">Privado</option>
          </select>
          <br/>
        `,
      confirmButtonText: "Registrar",
      showCancelButton: true,
      preConfirm: () => {
        let nombreCliente = document.getElementById("nombreCliente").value;
        let apellidoCliente = document.getElementById("apellidoCliente").value;
        const condicionCliente = document.getElementById("condicionCliente").value;
        const razonSocial = document.getElementById("razonSocial").value;
        const cuil_cuit_Cliente = document.getElementById("cuil_cuit_Cliente").value;
        const telefonoCliente = document.getElementById("telefonoCliente").value;
        const mailCliente = document.getElementById("mailCliente").value;
        const direccionCliente = document.getElementById("direccionCliente").value;

        // Capitalize first letter of nombreCliente and apellidoCliente
        nombreCliente = capitalizeFirstLetter(nombreCliente);
        apellidoCliente = capitalizeFirstLetter(apellidoCliente);

        // Validaciones
        const nombreRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
        const apellidoRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
        const cuilRegex = /^\d{2}-\d{8}-\d{1}$/;
        const telefonoRegex = /^\d{10}$/;
        const mailRegex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
        const direccionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
        const razonRegex = /^[a-zA-Z\sÀ-ÿ]+$/;

        if (!nombreCliente || !nombreRegex.test(nombreCliente)) {
          Swal.showValidationMessage("El nombre no debe contener números.");  
          return false;
        }
        if (!apellidoCliente || !apellidoRegex.test(apellidoCliente)) {
          Swal.showValidationMessage("El apellido no debe contener números.");
          return false;
        }
        if (!cuil_cuit_Cliente || !cuilRegex.test(cuil_cuit_Cliente)) {
          Swal.showValidationMessage("El CUIL debe contener entre 10 y 11 dígitos, separado por guiones (-).");
          return false;
        }
        if (!telefonoCliente || !telefonoRegex.test(telefonoCliente)) {
          Swal.showValidationMessage("El teléfono debe contener solo 10 dígitos.");
          return false;
        }
        if (!mailCliente || !mailRegex.test(mailCliente)) {
          Swal.showValidationMessage("El correo electrónico no es válido.");
          return false;
        }
        if (!direccionCliente || !direccionRegex.test(direccionCliente)) {
          Swal.showValidationMessage("La dirección no debe contener caracteres especiales.");
          return false;
        }
      
        if (!razonSocial || !razonRegex.test(razonSocial)) {
          Swal.showValidationMessage("La razon social no es correcta.");
          return false;
        }

        return {
          nombreCliente,
          apellidoCliente,
          condicionCliente,
          razonSocial,
          cuil_cuit_Cliente,
          telefonoCliente,
          mailCliente,
          direccionCliente,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(URL_CLIENTES_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire(
            "¡Éxito!",
            "El cliente fue registrado correctamente.",
            "success"
          );
          onClienteRegistrado();
          closeRegistroModal();
        } catch (error) {
          Swal.fire(
            "Error",
            "Hubo un problema al registrar el cliente.",
            "error"
          );
        }
      } else {
        closeRegistroModal();
      }
    });
  };

  useEffect(() => {
    if (isRegistroModalOpen) {
      handleRegistrarCliente();
    }
  }, [isRegistroModalOpen]);

  return null; // No renderiza nada directamente
};

export default CrearClientes;
