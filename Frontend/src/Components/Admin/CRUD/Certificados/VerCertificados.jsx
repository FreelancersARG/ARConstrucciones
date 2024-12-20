import {useEffect} from 'react';
import Swal from 'sweetalert2';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';

const VerCertificados = ({ onCertificadoVer }) => {
  const { verRegistroSeleccionado, clearVerRegistroSeleccionado } = useVerRegistroStore();
  
  const handleVerCertificados = () => {
      Swal.fire({
        title: 'Información del Certificado',
        icon: 'info',
        html: `
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <tbody>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right; width: 35%;">Monto del Certificado:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${verRegistroSeleccionado.montoCert}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Nro del Certificado:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.nroCertificado}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha de Emision:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.fechaEmisionCert}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha de Pago:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.fechaPagoCert}</td>
              </tr>
              <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Estado del certificado:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.estadoCert === 0 ? "Pagado" : "No Pagado" }</td>
              </tr>
               <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Link de la factura:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.linkFacturaCert}</td>
              </tr>
                 <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Link Factura Pagada</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.linkFacturaPagadaCert}</td>
              </tr>
               </tr>
                 <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Redeterminacion:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.redeterminacion === 0 ? "Revalorizado" : "No Revalorizado"}</td>
              </tr>
              </tr>
                 <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Valor de la Redeterminacion:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${verRegistroSeleccionado.valorredeterminacion}</td>
              </tr>
              </tr>
                 <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Fecha de la Redemterminacion:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.fechaRedeterminacion}</td>
              </tr>
              </tr>
                 <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Obra asociada:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.NombreObra}</td>
              </tr>
              </tr>
                 <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Precio de la obra:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.PrecioObra}</td>
              </tr>
              </tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Progreso de la obra:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                  ${verRegistroSeleccionado.ProgresoObra}%
                  <div style="background-color: #f3f3f3; border-radius: 4px; overflow: hidden; margin-top: 4px;">
                    <div style="width: ${verRegistroSeleccionado.ProgresoObra}%; background-color: #4caf50; height: 10px;"></div>
                  </div>
                </td>
              </tr>
              </tr>
                 <tr>
                <th style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Sector de la obra:</th>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${verRegistroSeleccionado.SectorObra === 0 ? "Público" : "Privado"}</td>
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
      handleVerCertificados();
    }
  }, [verRegistroSeleccionado]);

  return null; // Este componente no renderiza nada en pantalla
};

export default VerCertificados
