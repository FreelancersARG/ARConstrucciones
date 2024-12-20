import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';


const VerObra = ({ onObraVer }) => {
    const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();
  
    const handleVerObra = () => {
        Swal.fire({
          title: 'Información de la Obra',
          icon: 'info',
          html: `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
              <tbody>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Nombre de Obra:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.nombreObra}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Direccion de Obra:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.direccionObra}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Descripcion de Obra:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.descripcionObra}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha Inicio:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.fechainicioObra}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha Fin:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.fechafinObra}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Precio de la Obra:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.precioObra}</td>
                </tr>
                <tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Sector de la Obra:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.sectorObra === 1 ? "Privado" : "Publico"}</td>
                </tr>
                  <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Barra de Progreso:</th>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                    <div style="background-color: #f3f3f3; border-radius: 4px; overflow: hidden;">
                      <div style="width: ${verRegistroSeleccionado.progresoObra}%; background-color: #4caf50; text-align: center; color: white; padding: 2px 0;">
                        ${verRegistroSeleccionado.progresoObra}%
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                    <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Cliente:</th>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.nombreCliente} ${verRegistroSeleccionado.apellidoCliente}</td>
                </tr>   
              </tbody>
            </table>
          `,
          confirmButtonText: 'Cerrar',
          customClass: {
            popup: 'swal-wide',
          },
          width: '600px', // Aumentar el ancho del modal para mejor presentación
          didClose: () => {
            clearVerRegistroSeleccionado(); // Limpiar los registros al cerrar el modal
          },
        });
      };
  
    useEffect(() => {
      if (verRegistroSeleccionado) {
        handleVerObra();
      }
    }, [verRegistroSeleccionado]);
  
    return null; // Este componente no renderiza nada en pantalla
  };

export default VerObra
