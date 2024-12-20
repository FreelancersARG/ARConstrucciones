import { useEffect, useState } from 'react';
import { URL_LIBRO_DIARIO, URL_PENDIENTES } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Aside from '../../../Layout/Aside';
import { Link } from 'react-router-dom';

const VerLibroDiario = () => {
  const token = useAuthStore((state) => state.token);
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [datos, setDatos] = useState([]);


  // Formatear números con separador de miles
  const formatCurrency = (value) => {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  useEffect(() => {
    const date = new Date();
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    const fechaActual = `${año}-${mes}-${dia}`;
    setFechaRegistro(fechaActual);
    setFechaSeleccionada(fechaActual);
  }, []);

  const enviarFechaPorPost = async () => {
    try {
      const response = await axios.post(
        `${URL_LIBRO_DIARIO}/post`,
        { fechaRegistro },
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        
        setDatos(response.data.data || []);
  
      }
     
    } catch (error) {
      console.error('Error al enviar la fecha por POST:', error);
    }
  };


  const handleFechaSeleccionada = (e) => {
    const nuevaFecha = e.target.value;
    const fechaActual = new Date();
    const fechaIngresada = new Date(nuevaFecha);
  
    // Validar si la fecha seleccionada es mayor a la fecha actual
    if (fechaIngresada > fechaActual) {
      toast.error('Fecha inválida. Seleccione una fecha anterior o igual a hoy.', {
        position: 'top-right',
      });
      return;
    }
  
    setFechaSeleccionada(nuevaFecha);
  };
  

useEffect(() => {
  enviarFechaPorPost();
}, [fechaRegistro]);

  const handleBuscarFecha = async () => {
    await enviarFechaPorPost();
    // await obtenerDatosPorGet();
    setFechaRegistro(fechaSeleccionada);
  };


    // Dividir los datos en Debe y Haber
    const calcularTotales = () => {
      const debe = datos.filter(
        (item) =>
          item.TIPO === "Egreso" ||
          item.TIPO === "COMPRA MATERIAL" ||
          item.TIPO === "REMUNERACION" ||
          item.TIPO === "Otros egresos"
      );
    
      const haber = datos.filter(
        (item) =>
          item.TIPO === "Ingreso" ||
          item.TIPO === "CERTIFICADO" ||
          item.TIPO === "VENTA TERRENO" ||
          item.TIPO === "ALQUILER" ||
          item.TIPO === "Otros ingresos"
      );
    
      const totalDebe = debe.reduce((sum, item) => sum + parseFloat(item.Monto), 0);
      const totalHaber = haber.reduce((sum, item) => sum + parseFloat(item.Monto), 0);
      const neto = totalHaber - totalDebe;
    
      return { debe, haber, totalDebe, totalHaber, neto };
    };
    
    const { debe, haber, totalDebe, totalHaber, neto } = calcularTotales();
    


    useEffect(() => {
      const obtenerPendientes = async () => {
        try {
          const response = await axios.get(`${URL_PENDIENTES}`, {
        headers: { Authorization: `Bearer ${token}` },
          });
          const pendientes = response.data;
      
          // Filtrar solo las tareas en estado "Pendiente"
          const tareasPendientes = pendientes.filter((tarea) => tarea.estado === 'Pendiente');
      
          if (tareasPendientes.length > 0) {
        toast(
          (t) => (
            <span>
          Tienes {tareasPendientes.length} tareas pendientes.{' '}
          <Link to="/Admin/Pendientes" onClick={() => toast.dismiss(t.id)} className="text-blue-500 underline">
            Ver Pendientes
          </Link>
            </span>
          ),
          {
            icon: '🔔', // Icono de la notificación
            position: 'top-right', // Posición de la notificación
          }
        );
          } else {
        toast.info('No tienes tareas pendientes.', {
          position: 'top-right',
        });
          }
        } catch (error) {
          console.error('Error al obtener las tareas pendientes:', error);
          toast.error('Error al cargar las tareas pendientes.', {
        position: 'top-right',
          });
        }
      };
  
      obtenerPendientes();
    }, [token]);

  return (
    <div>
      <Toaster />
      <p className="text-black font-semibold text-4xl flex justify-center mt-5 uppercase">Libro Diario</p>

      {/* Selector de fecha */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
        <div className="relative">
        <input
  type="date"
  className="px-4 py-2 rounded-lg border-2"
  value={fechaSeleccionada}
  onChange={handleFechaSeleccionada}
/>

        </div>
        <button
          onClick={handleBuscarFecha}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Buscar Fecha
        </button>
      </div>

      {/* Botones encima de la tabla */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Link
          to={'/Admin/Certificados'}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Registrar Certificado
        </Link>
        <Link
          to={'/Admin/Remuneraciones'}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Registrar Remuneración
        </Link>
        <Link
          to={'/Admin/CompraMateriales'}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Registrar Compra de Material
        </Link>
        <Link
          to={'/Admin/VentaTerrenos'}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Registrar Venta de Terreno
        </Link>
        <Link
          to={'/Admin/Operaciones'}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Registrar Operación
        </Link>
      </div>

      {/* Tabla */}
      <div className="flex flex-col lg:flex-row">
        <div className="relative lg:top-8 mb-4 lg:mb-0">
          <Aside />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-zinc-500">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Tipo</th>
                <th className="border border-gray-300 px-4 py-2">Descripción</th>
                <th className="border border-gray-300 px-4 py-2">Monto</th>
                <th className="border border-gray-300 px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
  {datos.length > 0 ? (
    <>
      {debe.length > 0 ? (
        debe.map((item, index) => (
          <tr key={`debe-${index}`} className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
            <td className="border border-gray-300 px-4 py-2">{item.TIPO}</td>
            <td className="border border-gray-300 px-4 py-2">{item.Descripcion}</td>
            <td className="border border-gray-300 px-4 py-2">{formatCurrency(item.Monto)}</td>
            <td className="border border-gray-300 px-4 py-2">{item.Fecha}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center text-red-600 font-bold py-4">
            No tiene egresos registrados para la fecha seleccionada.
          </td>
        </tr>
      )}

      <tr className="bg-amber-200 font-bold">
        <td colSpan="3" className="text-right px-4 py-2">Total Debe:</td>
        <td className="px-4 py-2">{formatCurrency(totalDebe)}</td>
        <td></td>
      </tr>

      {haber.length > 0 ? (
        haber.map((item, index) => (
          <tr key={`haber-${index}`} className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
            <td className="border border-gray-300 px-4 py-2">{item.TIPO}</td>
            <td className="border border-gray-300 px-4 py-2">{item.Descripcion}</td>
            <td className="border border-gray-300 px-4 py-2">{formatCurrency(item.Monto)}</td>
            <td className="border border-gray-300 px-4 py-2">{item.Fecha}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center text-red-600 font-bold py-4">
            No tiene ingresos registrados para la fecha seleccionada.
          </td>
        </tr>
      )}

      <tr className="bg-amber-200 font-bold">
        <td colSpan="3" className="text-right px-4 py-2">Total Haber:</td>
        <td className="px-4 py-2">{formatCurrency(totalHaber)}</td>
        <td></td>
      </tr>

      <tr className={`font-bold ${neto >= 0 ? "bg-green-300" : "bg-red-300"}`}>
        <td colSpan="3" className="text-right px-4 py-2">Total Neto:</td>
        <td className="px-4 py-2">{formatCurrency(neto)}</td>
        <td></td>
      </tr>
    </>
  ) : (
    <tr>
      <td colSpan="5" className="text-center text-red-600 font-bold py-4">
        No hay registros ingresados para la fecha seleccionada.
      </td>
    </tr>
  )}
</tbody>


          </table>
        </div>
      </div>
    </div>
  );
};

export default VerLibroDiario;
