import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../Context/useAuthStore';
import useRegistroStore from '../../../../Context/useRegistroStore';
import { URL_USUARIOS_CREAR, URL_USUARIOS, URL_EMPLEADOS_SIN_USUARIO } from '../../../../Constants/endpoints-API';

const CrearUsuarios = ({ onUsuarioRegistrado }) => {
  const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
  const token = useAuthStore((state) => state.token);

  const [empleados, setEmpleados] = useState([]);

  const getEmpleados = async () => {
    try {
      const response = await axios.get(URL_EMPLEADOS_SIN_USUARIO, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmpleados(response.data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const handleRegistrarUsuarios = () => {
    Swal.fire({
      title: 'Registrar Usuarios',
      html: `
        <input id="nombreUsuario" placeholder="Nombre de usuario" class="swal2-input" />
        <input id="mailUsuario" placeholder="Correo" class="swal2-input" />
        <input id="passwordUsuario" placeholder="Contraseña" class="swal2-input" />
        <br/>
        <br/>
        <label><strong>Selecciona el rol:</strong></label>
        <br/>
        <select id="rol" class="swal2-select">
          <option value="Admin">Admin</option>
          <option value="Empleado">Empleado</option>
        </select>
        <br/>
        <br/>
        <label><strong>Selecciona el empleado:</strong></label>
        <br/>
        <select id="select_empleado" class="swal2-select">
          ${empleados
            .map(
              (empleado) =>
                `<option value="${empleado.id_Empleado}">${empleado.nombreEmpleado} ${empleado.apellidoEmpleado}</option>`
            )
            .join('')}
        </select>
      `,
      confirmButtonText: 'Registrar',
      showCancelButton: true,
      preConfirm: async () => {
        const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
        const mailUsuario = document.getElementById('mailUsuario').value.trim();
        const passwordUsuario = document.getElementById('passwordUsuario').value.trim();
        const rol = document.getElementById('rol').value;
        const id_Empleado = document.getElementById('select_empleado').value;

        const nombreRegex = /^[a-zA-Z0-9À-ÿ\s,.-]+$/;
        const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        if (!nombreRegex.test(nombreUsuario)) {
          Swal.showValidationMessage('El nombre de usuario no debe contener caracteres especiales.');
          return false;
        }

        if (!mailUsuario || !mailRegex.test(mailUsuario)) {
          Swal.showValidationMessage('El correo no es válido.');
          return false;
        }

        if (!passwordUsuario || !passwordRegex.test(passwordUsuario)) {
          Swal.showValidationMessage(
            'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número.'
          );
          return false;
        }

        try {
          // Obtener todos los usuarios registrados
          const response = await axios.get(`${URL_USUARIOS}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const usuarios = response.data;

          // Verificar si el usuario o correo ya están registrados
          const usuarioExiste = usuarios.some((usuario) => usuario.nombreUsuario === nombreUsuario);
          const correoExiste = usuarios.some((usuario) => usuario.mailUsuario === mailUsuario);

          if (usuarioExiste) {
            Swal.showValidationMessage('El nombre de usuario ya está en uso.');
            return false;
          }

          if (correoExiste) {
            Swal.showValidationMessage('El correo ya está en uso.');
            return false;
          }
        } catch (error) {
          Swal.showValidationMessage('Error al verificar usuarios existentes.');
          console.error('Error al obtener usuarios:', error);
          return false;
        }

        return {
          nombreUsuario,
          mailUsuario,
          passwordUsuario,
          rol,
          id_Empleado,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(URL_USUARIOS_CREAR, result.value, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire('¡Éxito!', 'El usuario fue registrado correctamente.', 'success');
          onUsuarioRegistrado();
          closeRegistroModal();
        } catch (error) {
          console.error('Error al registrar usuario:', error);
          Swal.fire('Error', 'Hubo un problema al registrar el usuario.', 'error');
        }
      } else {
        closeRegistroModal();
      }
    });
  };

  

  useEffect(() => {
    if (isRegistroModalOpen) {
      handleRegistrarUsuarios();
    }
    getEmpleados();
  }, [isRegistroModalOpen]);

  return null; // No renderiza nada directamente
};

export default CrearUsuarios;
