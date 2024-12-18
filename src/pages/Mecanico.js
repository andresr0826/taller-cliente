// src/pages/Mecanico.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';

const Mecanico = () => {
  const [herramientas, setHerramientas] = useState([]);
  const [search, setSearch] = useState('');
  const [username, setUsername] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    const fetchHerramientas = async () => {
      try {
        const response = await api.get('/herramientas', {
          params: { nombre: search }
        });
        setHerramientas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHerramientas();

    // Decodificar token para obtener username y rol
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username);
      setRol(payload.rol);
    }
  }, [search]);

  const handleNotify = async (idherramienta, notificacion) => {
    try {
      await api.post('/notificaciones', {
        idherramienta,
        notificacion
      });
      alert('Notificación enviada');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAlta = async () => {
    try {
      await api.post('/notificaciones', {
        notificacion: 'alta'
      });
      alert('Notificación de alta enviada');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header username={username} rol={rol} />
      <div className="mecanico-container">
        <h2>Página Mecánico</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Buscar herramienta"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button onClick={handleAlta} className="alta-button">Notificar Alta</button>
        </div>
        <div className="herramientas">
          {herramientas.map(herramienta => (
            <div key={herramienta._id} className="herramienta-card">
              <img src={herramienta.foto} alt={herramienta.nombre} className="herramienta-image" />
              <h3>{herramienta.nombre}</h3>
              <p>Estado: {herramienta.estado}</p>
              <p>Marca: {herramienta.marca}</p>
              <div className="notify-section">
                <button className="notify-button">Notificar</button>
                <select
                  onChange={(e) => handleNotify(herramienta._id, e.target.value)}
                  defaultValue=""
                  className="notify-select"
                >
                  <option value="" disabled>Selecciona</option>
                  <option value="Perdida">Perdida</option>
                  <option value="Rota">Rota</option>
                  <option value="Disponible">Disponible</option>
                  <option value="En uso">En uso</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mecanico;
