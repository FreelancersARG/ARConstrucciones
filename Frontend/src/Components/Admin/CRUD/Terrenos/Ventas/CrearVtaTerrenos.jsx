import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuthStore from '../../../../../Context/useAuthStore';
import useRegistroStore from '../../../../../Context/useRegistroStore';
import { URL_CLIENTES, URL_TERRENOS, URL_VTA_TERRENOS_CREAR } from '../../../../../Constants/endpoints-API';

const CrearVtaTerrenos = ({ onVtaTerrenoRegistrado }) => {

    const { isRegistroModalOpen, closeRegistroModal } = useRegistroStore();
    const token = useAuthStore((state) => state.token);
  
    const [terrenos, setTerrenos] = useState([]);
    const [clientes, setClientes] = useState([]);
  
    const getTerrenos = async () => {
      try {
        const response = await axios.get(URL_TERRENOS, { headers: { Authorization: `Bearer ${token}` } });
        setTerrenos(response.data);
      } catch (error) {
        console.error('Error al obtener terrenos:', error);
      }
    };
  
    const getClientes = async () => {
      try {
        const response = await axios.get(URL_CLIENTES, { headers: { Authorization: `Bearer ${token}` } });
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };

    const handleRegistrarVtaTerreno = () => {
      Swal.fire({
        title: 'Registrar Venta de Terreno',
        html: `
          <label><b>Cliente</b></label> 
          <br>
        <select id="select_cliente" class="swal2-select">
          ${clientes
            .map(
              (cliente) =>
                `<option value="${cliente.id_cliente}" ${
                  cliente.id === cliente.id_cliente ? 'selected' : ''
                }>${cliente.nombreCliente} ${cliente.apellidoCliente}</option>`
            )
            .join('')}
        </select>
          <br>
          <br>
          <label><b>Terreno</b></label> 
          <br>
        <select id="select_terreno" class="swal2-select">
          ${terrenos
            .map(
              (terreno) =>
                `<option value="${terreno.id_terreno}" ${
                  terreno.id === terreno.id_terreno ? 'selected' : ''
                }>Nº Terreno: ${terreno.id_terreno}</option>`
            )
            .join('')}
        </select>
          <br>
          <br>
          <label><b>Fecha Venta </b></label> 
          <br>
        <input id="fechaVentaTerreno" class="swal2-input" type="date" required />
      `,
        confirmButtonText: 'Registrar',
        showCancelButton: true,
        preConfirm: () => {
          const id_cliente = document.getElementById('select_cliente').value;
          const id_terreno = document.getElementById('select_terreno').value;
          const fechaVentaTerreno = document.getElementById('fechaVentaTerreno').value;
  

          if (!id_cliente || !id_terreno || !fechaVentaTerreno) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          }
  
          return {
            id_cliente,
            id_terreno,
            fechaVentaTerreno
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post(URL_VTA_TERRENOS_CREAR, result.value, {
              headers: { Authorization: `Bearer ${token}` }
            });
            Swal.fire('¡Éxito!', 'La venta del terreno fue registrado correctamente.', 'success');
            onVtaTerrenoRegistrado(); 
            closeRegistroModal(); 
          } catch (error) {
            console.error('Error al registrar la venta del terreno:', error);
            Swal.fire('Error', 'Hubo un problema al registrar la venta del terreno.', 'error');
          }
        } else {
          closeRegistroModal(); 
        }
      });
    };
  
useEffect(() => {
      if (isRegistroModalOpen) {
        handleRegistrarVtaTerreno();
      }
      getTerrenos();
      getClientes();
    }, [isRegistroModalOpen]);
  
    return null; // No renderiza nada directamente
  };

export default CrearVtaTerrenos
