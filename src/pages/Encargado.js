// src/pages/Encargado.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModalForm from '../components/ModalForm';

const Encargado = () => {
  const [herramientas, setHerramientas] = useState([]);
  const [selectedHerramienta, setSelectedHerramienta] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHerramientas();
  }, []);

  const fetchHerramientas = async () => {
    try {
      const response = await api.get('/herramientas');
      setHerramientas(response.data);
    } catch (error) {
      console.error('Error al obtener herramientas:', error);
    }
  };

  const handleAdd = () => {
    setSelectedHerramienta(null); // Limpia el formulario
    setIsModalOpen(true);
  };

  const handleUpdate = (herramienta) => {
    setSelectedHerramienta(herramienta); // Pasa los datos al formulario
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que quieres borrar esta herramienta?')) {
      try {
        await api.delete(`/herramientas/${id}`);
  
        // Actualizar el estado local eliminando la herramienta
        setHerramientas(herramientas.filter(herr => herr._id !== id));
  
        alert('Herramienta eliminada correctamente.');
      } catch (error) {
        console.error('Error al borrar la herramienta:', error);
        alert('Error al eliminar la herramienta.');
      }
    }
  };
  

  const handleSubmit = async (formData) => {
    try {
      if (selectedHerramienta) {
        // Actualizar
        await api.put(`/herramientas/${selectedHerramienta._id}`, formData);
      } else {
        // Dar de Alta
        await api.post('/herramientas', formData);
      }
      setIsModalOpen(false);
      fetchHerramientas(); // Refresca la lista
    } catch (error) {
      console.error('Error al guardar la herramienta:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="encargado-container">
        <h2>Herramientas</h2>
        <button onClick={handleAdd}>Dar de Alta Herramienta</button>
        <div className="herramientas">
          {herramientas.map(herr => (
            <div key={herr._id} className="herramienta-card">
              <h3>{herr.nombre}</h3>
              <p>Estado: {herr.estado}</p>
              <p>Marca: {herr.marca}</p>
              <img src={herr.foto} alt={herr.nombre} width="100" />
              <button onClick={() => handleUpdate(herr)}>Actualizar</button>
              <button onClick={() => handleDelete(herr._id)}>Borrar</button>
            </div>
          ))}
        </div>
      </div>
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedHerramienta}
      />
      <Footer />
    </>
  );
};

export default Encargado;

