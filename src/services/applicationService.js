import api from './api';

// Get all applications with optional filters
export const getApplications = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);
    
    const response = await api.get(`applications/?${params.toString()}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || 'Failed to fetch applications' };
  }
};

// Get statistics
export const getStatistics = async () => {
  try {
    const response = await api.get('applications/statistics/');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || 'Failed to fetch statistics' };
  }
};

// Create new application
export const createApplication = async (data) => {
  try {
    const response = await api.post('applications/', data);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || 'Failed to create application' };
  }
};

// Update application
export const updateApplication = async (id, data) => {
  try {
    const response = await api.put(`applications/${id}/`, data);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || 'Failed to update application' };
  }
};

// Delete application
export const deleteApplication = async (id) => {
  try {
    await api.delete(`applications/${id}/`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response?.data || 'Failed to delete application' };
  }
};
