import React, { useState, useEffect } from 'react';
import '../AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '', image: null, features: [] });
  const [editService, setEditService] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [newFeature, setNewFeature] = useState('');
  const [editFeature, setEditFeature] = useState('');

  // Fetch all services
  useEffect(() => {
    fetch('http://localhost:8000/api/services/')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  // Add service
  const handleAddService = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newService.name);
    formData.append('description', newService.description);
    formData.append('price', newService.price);
    formData.append('features', JSON.stringify(newService.features || []));
    if (newService.image) formData.append('image', newService.image);

    const res = await fetch('http://localhost:8000/api/services/', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const data = await res.json();
    if (data.id) {
      setServices([...services, data]);
      setNewService({ name: '', description: '', price: '', image: null, features: [] });
      setShowAddModal(false);
      setNewFeature('');
    }
  };

  // Delete service
  const handleDeleteService = async (id) => {
    await fetch(`http://localhost:8000/api/services/${id}/`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setServices(services.filter(s => s.id !== id));
  };

  // Open edit modal
  const handleEditClick = (service) => {
    setEditService({ ...service, image: null, features: service.features || [] });
    setEditImagePreview(null);
    setShowEditModal(true);
    setEditFeature('');
  };

  // Update service (with image)
  const handleUpdateService = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editService.name);
    formData.append('description', editService.description);
    formData.append('price', editService.price);
    formData.append('features', JSON.stringify(editService.features || []));
    if (editService.image) formData.append('image', editService.image);

    const res = await fetch(`http://localhost:8000/api/services/${editService.id}/`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'X-HTTP-Method-Override': 'PUT',
      },
    });
    const data = await res.json();
    setServices(services.map(s => (s.id === editService.id ? data : s)));
    setShowEditModal(false);
    setEditService(null);
    setEditImagePreview(null);
    setEditFeature('');
  };

  // For image preview in edit modal
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditService({ ...editService, image: file });
    if (file) {
      setEditImagePreview(URL.createObjectURL(file));
    } else {
      setEditImagePreview(null);
    }
  };

  // Add feature to new service
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setNewService({ ...newService, features: [...(newService.features || []), newFeature.trim()] });
      setNewFeature('');
    }
  };

  // Remove feature from new service
  const handleRemoveFeature = (idx) => {
    setNewService({
      ...newService,
      features: newService.features.filter((_, i) => i !== idx)
    });
  };

  // Add feature to edit service
  const handleAddEditFeature = () => {
    if (editFeature.trim()) {
      setEditService({ ...editService, features: [...(editService.features || []), editFeature.trim()] });
      setEditFeature('');
    }
  };

  // Remove feature from edit service
  const handleRemoveEditFeature = (idx) => {
    setEditService({
      ...editService,
      features: editService.features.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <ul>
          <li className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>Manage Services</li>
          <li className={activeTab === 'leads' ? 'active' : ''} onClick={() => setActiveTab('leads')}>View Leads</li>
          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Site Settings</li>
        </ul>
      </aside>
      <main className="admin-main">
        {activeTab === 'services' && (
          <div style={{ position: 'relative' }}>
            <h3>Manage Services</h3>
            {/* Add Service Button (top right) */}
            <button
              className="add-service-fab"
              onClick={() => setShowAddModal(true)}
              title="Add Service"
            >
              + Add Service
            </button>

            {/* Service Cards */}
            <div className="service-cards">
              {services.map(service => (
                <div className="service-card-admin" key={service.id}>
                  {service.image && (
                    <img src={service.image} alt={service.name} className="service-card-img" />
                  )}
                  <div className="service-card-content">
                    <h4>{service.name}</h4>
                    <p>{service.description}</p>
                    {service.features && service.features.length > 0 && (
                      <ul>
                        {service.features.map((f, idx) => <li key={idx}>{f}</li>)}
                      </ul>
                    )}
                    <div className="service-card-footer">
                      <span className="service-card-price">{service.price}</span>
                      <div>
                        <button className="edit-btn" onClick={() => handleEditClick(service)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDeleteService(service.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Modal */}
            {showAddModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Add Service</h3>
                  <form onSubmit={handleAddService} encType="multipart/form-data">
                    <input
                      type="text"
                      placeholder="Service Name"
                      value={newService.name}
                      onChange={e => setNewService({ ...newService, name: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={newService.description}
                      onChange={e => setNewService({ ...newService, description: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      value={newService.price}
                      onChange={e => setNewService({ ...newService, price: e.target.value })}
                      required
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setNewService({ ...newService, image: e.target.files[0] })}
                    />
                    {/* Features input */}
                    <div className="features-input">
                      <input
                        type="text"
                        placeholder="Add a feature"
                        value={newFeature}
                        onChange={e => setNewFeature(e.target.value)}
                      />
                      <button type="button" onClick={handleAddFeature}>Add Feature</button>
                    </div>
                    <ul>
                      {(newService.features || []).map((f, idx) => (
                        <li key={idx}>
                          {f}
                          <button type="button" onClick={() => handleRemoveFeature(idx)}>x</button>
                        </li>
                      ))}
                    </ul>
                    <div className="modal-actions">
                      <button type="submit">Add</button>
                      <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Modal */}
            {showEditModal && editService && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Edit Service</h3>
                  <form onSubmit={handleUpdateService} encType="multipart/form-data">
                    <input
                      type="text"
                      placeholder="Service Name"
                      value={editService.name}
                      onChange={e => setEditService({ ...editService, name: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={editService.description}
                      onChange={e => setEditService({ ...editService, description: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      value={editService.price}
                      onChange={e => setEditService({ ...editService, price: e.target.value })}
                      required
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageChange}
                    />
                    {/* Features input */}
                    <div className="features-input">
                      <input
                        type="text"
                        placeholder="Add a feature"
                        value={editFeature}
                        onChange={e => setEditFeature(e.target.value)}
                      />
                      <button type="button" onClick={handleAddEditFeature}>Add Feature</button>
                    </div>
                    <ul>
                      {(editService.features || []).map((f, idx) => (
                        <li key={idx}>
                          {f}
                          <button type="button" onClick={() => handleRemoveEditFeature(idx)}>x</button>
                        </li>
                      ))}
                    </ul>
                    {/* Show new preview if selected, else show current image */}
                    {editImagePreview ? (
                      <img src={editImagePreview} alt="Preview" style={{ width: 60, margin: '0.5rem 0' }} />
                    ) : (
                      editService && editService.image && typeof editService.image === 'string' && (
                        <img src={editService.image} alt="Current" style={{ width: 60, margin: '0.5rem 0' }} />
                      )
                    )}
                    <div className="modal-actions">
                      <button type="submit">Update</button>
                      <button type="button" onClick={() => { setShowEditModal(false); setEditImagePreview(null); setEditService(null); setEditFeature(''); }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'leads' && (
          <div>
            <h3>View Leads</h3>
            <p>(coming soon)</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div>
            <h3>Site Settings</h3>
            <p>(coming soon)</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;