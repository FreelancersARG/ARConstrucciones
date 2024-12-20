import { useState, useEffect } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import '../../../../Styles/table.css';
import { URL_OPERACIONES,URL_OPERACIONES_ELIMINAR } from '../../../../Constants/endpoints-API';
import useAuthStore from '../../../../Context/useAuthStore';
import { LIBRO_DIARIO } from '../../../../Routes/routes';
import { Link } from 'react-router-dom';
import useRegistroStore from '../../../../Context/useRegistroStore';
import useVerRegistroStore from '../../../../Context/useVerRegistroStore';
import Aside from '../../../Layout/Aside';
import axios from 'axios';
import Swal from 'sweetalert2'; //sirve para mostrar alertas
import EditarOperaciones from './EditarOperaciones';
import CrearOperaciones from './CrearOperaciones';
import VerOperaciones from './VerOperaciones';

const MainOperaciones = () => {
    const token = useAuthStore((state) => state.token);
  const { setRegistroSeleccionado, openRegistroModal } = useRegistroStore();//objeto que se importa de useStockStore
  const {setVerRegistroSeleccionado} = useVerRegistroStore();
  const [filtrado, setFiltrado] = useState('');
  const [datos, setDatos] = useState([]);

  const getOperaciones = async () => {
   
    try {
      
      const response = await axios.get(URL_OPERACIONES, { headers: { Authorization: `Bearer ${token}` } });
      setDatos(response.data);
    } catch (error) {
      console.error('Error al obtener la operacion:', error);
    }
  };
  
// borrado logico
  const handleEliminarOperacion = async (operacion) => {//funcion para eliminar una operacion por medio de un id
    const confirmacion = await Swal.fire({//sirver para mostrar una alerta y confirmar si se quiere eliminar
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la operacion ${operacion.nombreOperacion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.put(
          `${URL_OPERACIONES_ELIMINAR}${operacion.id_operacion}`,
          { ...operacion }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire('Eliminado!', 'La operacion ha sido eliminado correctamente.', 'success');
        getOperaciones(); 
      } catch (error) {
        console.error('Error al eliminar la operacion:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar la operacion.', 'error');
      }
    }
  };

  const columns = [
    { header: 'Nº', accessorKey: 'id_operacion' },
    { header: 'Operacion', accessorKey: 'nombreOperacion' },
    { header: 'Tipo', accessorKey: 'tipoOperacion' },
    { header: 'Monto', accessorFn: (row) => `$${row.montoOperacion}` },
    { header: 'Fecha', accessorKey: 'fechaOperacion' },

    {
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button onClick={() => setVerRegistroSeleccionado(row.original)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-blue-800 active:bg-blue-900 focus:outline-none" >
            Ver más
          </button>

          <button
            onClick={() => setRegistroSeleccionado(row.original)}
            className="bg-orange-600 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-orange-800 active:bg-orange-900 focus:outline-none"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminarOperacion(row.original)}
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
    getOperaciones();
  }, []);

  return (
    <div>
      <p className="text-black font-semibold text-4xl flex justify-center mt-5">Registros de Operaciones</p>
      
      {/* Buscador */}
      <div className="flex justify-center m-10">
        <div className="relative">
          <input
            className="w-80 md:w-96 lg:w-[400px] px-4 py-2 text-gray-800 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="search"
            placeholder="Buscar operaciones..."
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
          Registrar Operación
        </button>
      </div>
      <div className="flex justify-start items-center bg-gray-100 p-4">
      <Link
        to={LIBRO_DIARIO}
        className="px-6 py-3 bg-green-600 text-white font-semibold text-lg md:text-xl rounded-lg shadow-lg transition transform hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
      >
        Volver a Libro Diario
      </Link>
    </div>
    <br />
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
        <button
          className="m-2 px-4 py-2 rounded-full font-semibold text-[16px] bg-gray-300 text-black"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>
        <button
          className="m-2 px-4 py-2 rounded-full font-semibold text-[16px] bg-gray-300 text-black"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </button>
      </div>
      <VerOperaciones onOperacionVer={getOperaciones} />
      <EditarOperaciones onOperacionEditado={getOperaciones} />
      <CrearOperaciones onOperacionRegistrado={getOperaciones} />
    </div>
  )
}

export default MainOperaciones
