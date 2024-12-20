import {useEffect} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_CLIENTES_EDITAR } from '../../../../Constants/endpoints-API';

const EditarClientes = ({ onClienteEditado }) => {
  const { registroSeleccionado, clearRegistroSeleccionado } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const handleEditarCliente = () => {
    Swal.fire({
      title: 'Editar Cliente',
      html: `
        <label><b>Nombre</b></label> 
        <br>
        <input id="nombreCliente" class="swal2-input" value="${registroSeleccionado.nombreCliente}" />
        <br>
        <br>
        <label><b>Apellido</b></label> 
        <br>
        <input id="apellidoCliente" class="swal2-input" value="${registroSeleccionado.apellidoCliente}" />
        <br>
        <br>
        <label><b>Razon Social</b></label> 
        <br>
        <input id="razonSocial" class="swal2-input" value="${registroSeleccionado.razonSocial}" />
        <br>
        <br>
        <label><b>Cuil/Cuit</b></label> 
        <br>
        <input id="cuil_cuit_Cliente" class="swal2-input" value="${registroSeleccionado.cuil_cuit_Cliente}" />
        <br>
        <br>
        <label><b>Telefono</b></label> 
        <br>
        <input id="telefonoCliente" class="swal2-input" value="${registroSeleccionado.telefonoCliente}" />
         <br>
        <br>
        <label><b>E-Mail</b></label> 
        <br>
        <input id="mailCliente" class="swal2-input" value="${registroSeleccionado.mailCliente}" />
         <br>
        <br>
        <label><b>Direccion</b></label> 
        <br>
        <input id="direccionCliente" class="swal2-input" value="${registroSeleccionado.direccionCliente}" />
         <br>
        <br>
        <br/>
        <label><strong>Condición del cliente:</strong></label>
        <br/>
        <select id="condicionCliente" class="swal2-input">
        <option value="Privado" ${registroSeleccionado.condicionCliente === 'Privado' ? 'selected' : ''}>Privado</option>
        <option value="Monotributista" ${registroSeleccionado.condicionCliente === 'Monotributista' ? 'selected' : ''}>Monotributista</option>
      </select>
      <br/>
      `,
      confirmButtonText: 'Enviar',
      showCancelButton: true,
      preConfirm: () => {
        const nombreCliente = document.getElementById('nombreCliente').value;
        const apellidoCliente = document.getElementById('apellidoCliente').value;
        const razonSocial = document.getElementById('razonSocial').value;
        const condicionCliente = document.getElementById('condicionCliente').value;
        const cuil_cuit_Cliente = document.getElementById('cuil_cuit_Cliente').value;
        const telefonoCliente = document.getElementById('telefonoCliente').value;
        const mailCliente = document.getElementById('mailCliente').value;
        const direccionCliente = document.getElementById('direccionCliente').value;

        // Validaciones
        const nombreRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
        const apellidoRegex = /^[a-zA-Z\sÀ-ÿ]+$/;
        const cuilRegex = /^\d{2}-\d{8}-\d{1}$/;
        const telefonoRegex = /^\d{10}$/;
        const mailRegex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
        const direccionRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;

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

        return {
          nombreCliente,
          apellidoCliente,
          razonSocial,
          condicionCliente,
          cuil_cuit_Cliente,
          telefonoCliente,
          mailCliente,
          direccionCliente
          
        };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`${URL_CLIENTES_EDITAR}${registroSeleccionado.id_cliente}`, result.value, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire('¡Éxito!', 'El cliente fue actualizado correctamente.', 'success');
          onClienteEditado(); 
          clearRegistroSeleccionado(); 
        } catch (error) {
          Swal.fire('Error', 'Hubo un problema al actualizar el cliente.', 'error');
        }
      } else {
        clearRegistroSeleccionado(); 
      }
    });
  };

  useEffect(() => {
    if (registroSeleccionado) {
      handleEditarCliente();
    }
  }, [registroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default EditarClientes
