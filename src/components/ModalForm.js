import React, { useState, useEffect } from 'react';
import '../App.css';

const ModalForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    estado: '',
    marca: '',
    foto: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Rellenar el formulario con datos existentes
    } else {
      setFormData({ nombre: '', estado: '', marca: '', foto: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialData ? 'Actualizar Herramienta' : 'Dar de Alta Herramienta'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

          <label>Estado:</label>
          <input type="text" name="estado" value={formData.estado} onChange={handleChange} required />

          <label>Marca:</label>
          <input type="text" name="marca" value={formData.marca} onChange={handleChange} required />

          <label>URL de Foto:</label>
          <input type="text" name="foto" value={formData.foto} onChange={handleChange} required />

          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
