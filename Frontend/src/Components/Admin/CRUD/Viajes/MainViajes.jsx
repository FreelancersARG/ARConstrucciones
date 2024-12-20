import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import axios from 'axios';
import Swal from 'sweetalert2';
import Aside from '../../../Layout/Aside';
import useRegistroStore from '../../../../Context/useRegistroStore';
import '../../../../Styles/table.css';
import { URL_DETALLES_VIAJES, URL_VIAJES_ELIMINAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import useVerRegistroStore from "../../../../Context/useVerRegistroStore";
import EditarViaje from './EditarViajes';
import CrearViajes from './CrearViajes';
import VerViajes from './VerViajes';

const MainViajes = () => {
    const token = useAuthStore((state) => state.token);
    const { setVerRegistroSeleccionado } = useVerRegistroStore();
    const [filtrado, setFiltrado] = useState('');
    const [datos, setDatos] = useState([]);
    const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();

    const getViajes = async () => {
      try {
        const response = await axios.get(URL_DETALLES_VIAJES, { headers: { Authorization: `Bearer ${token}` } });
        setDatos(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error al obtener viajes:", error);
      }
    };
  

    const handleEliminarViaje = async (viaje) => {
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar este viaje ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
  
      if (confirmacion.isConfirmed) {
        try {
          await axios.put(
            `${URL_VIAJES_ELIMINAR}${viaje.id_DetallesViaje}`,
            { ...viaje },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          Swal.fire('Eliminado!', 'El viaje ha sido eliminado correctamente.', 'success');
          getViajes(); 
        } catch (error) {
          console.error('Error al eliminar viaje:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el viaje.', 'error');
        }
      }
    };


    const columns = [
      { header: 'Nº Viaje', accessorKey: 'id_DetallesViaje' },
      { header: 'Nº Vehiculo', accessorKey: 'patenteVehiculo' },
      { header: 'Nombre Obra', accessorKey: 'nombreObra' },
      { header: 'Fecha de Viaje', accessorKey: 'fechaViaje' },
      {
        header: 'Acciones',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button onClick={() => setVerRegistroSeleccionado(row.original)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none"
          >
            Ver más
          </button>
          <button
            onClick={() => setRegistroSeleccionado(row.original)}
            className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminarViaje(row.original)}
            className="bg-red-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-red-800 active:bg-red-900 focus:outline-none"
          >
            Eliminar
          </button>
        </div>
        )
      }
    ];
  
    const table = useReactTable({
      data: datos,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        globalFilter: filtrado
      },
      onGlobalFilterChange: setFiltrado
    });
  
  useEffect(() => {
      getViajes();
    }, []);
  
    return (
<div>
  <p className="text-black font-semibold text-4xl flex justify-center mt-5">Registros de Viajes</p>
  
  {/* Buscador */}
  <div className="flex justify-center m-10">
    <div className="relative">
      <input
        className="w-80 md:w-96 lg:w-[400px] px-4 py-2 text-gray-800 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="search"
        placeholder="Buscar viajes..."
        value={filtrado}
        onChange={(e) => setFiltrado(e.target.value)}
      />
    </div>
  </div>

  {/* Botón para registrar */}
  <div className="flex justify-center m-6">
    <button
      onClick={openRegistroModal}
      className="bg-green-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-green-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
    >
      Registrar Viaje
    </button>
  </div>

  <div className="flex">
    <div className="relative top-8">
      <Aside />
    </div>

    {/* Contenedor de la tabla con desplazamiento horizontal */}
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="odd:bg-white even:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border border-gray-300 text-sm text-gray-600"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  <div className="pagination flex justify-center mt-4">
    {Array.from({ length: table.getPageCount() }, (_, index) => (
      <button
        key={index}
        className={`m-2 px-4 py-2 rounded-full font-semibold text-[16px] ${
          table.getState().pagination.pageIndex === index 
            ? "bg-blue-600 text-white"
            : "bg-gray-300 text-black"
        }`}
        onClick={() => table.setPageIndex(index)}
      >
        {index + 1}
      </button>
    ))}
  </div>
      <VerViajes onViajeVer={getViajes} />
      <EditarViaje onViajeEditado={getViajes} />
      <CrearViajes onViajeRegistrado={getViajes} />
      </div>
  );
};
export default MainViajes;
