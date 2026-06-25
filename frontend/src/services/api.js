const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Helper to handle requests and inject token if available
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// API calls
export const api = {
  // Public endpoints
  getServices: () => request('/services'),
  getServiceBySlug: (slug) => request(`/services/${slug}`),
  getTestimonials: () => request('/testimonials'),
  getPartners: () => request('/partners'),
  getBlogs: () => request('/blogs'),
  getBlogBySlug: (slug) => request(`/blogs/${slug}`),
  getSettings: () => request('/settings'),
  submitEnquiry: (payload) => request('/enquiries', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  // Admin Auth
  login: (email, password) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  getAdminProfile: () => request('/auth/profile'),
  getDashboardStats: () => request('/auth/dashboard/stats'),

  // Admin Enquiries management
  getEnquiries: () => request('/enquiries/admin/enquiries'),
  getEnquiryById: (id) => request(`/enquiries/admin/enquiries/${id}`),
  updateEnquiryStatus: (id, status) => request(`/enquiries/admin/enquiries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
  addEnquiryNote: (id, note, addedBy) => request(`/enquiries/admin/enquiries/${id}/notes`, {
    method: 'PATCH',
    body: JSON.stringify({ note, addedBy }),
  }),
  deleteEnquiry: (id) => request(`/enquiries/admin/enquiries/${id}`, {
    method: 'DELETE',
  }),

  // Admin Services management
  createService: (payload) => request('/services/admin/services', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateService: (id, payload) => request(`/services/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  deleteService: (id) => request(`/services/admin/services/${id}`, {
    method: 'DELETE',
  }),

  // Admin settings
  updateSettings: (payload) => request('/settings/admin/settings', {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),

  // Admin Testimonials
  createTestimonial: (payload) => request('/testimonials/admin/testimonials', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateTestimonial: (id, payload) => request(`/testimonials/admin/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  deleteTestimonial: (id) => request(`/testimonials/admin/testimonials/${id}`, {
    method: 'DELETE',
  }),

  // Admin Partners
  createPartner: (payload) => request('/partners/admin/partners', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updatePartner: (id, payload) => request(`/partners/admin/partners/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  deletePartner: (id) => request(`/partners/admin/partners/${id}`, {
    method: 'DELETE',
  }),

  // Admin Blogs
  getBlogsAdmin: () => request('/blogs/admin/blogs'),
  createBlog: (payload) => request('/blogs/admin/blogs', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateBlog: (id, payload) => request(`/blogs/admin/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  deleteBlog: (id) => request(`/blogs/admin/blogs/${id}`, {
    method: 'DELETE',
  }),

  // File Upload Helper
  uploadFile: async (file, folder = 'nitru_connect') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    
    const token = localStorage.getItem('admin_token');
    // Using custom headers for multi-part (no content-type so browser calculates boundary)
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: headers
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'File upload failed');
    }
    return data;
  },

  // Admin Media Library
  getMedia: () => request('/admin/media'),
  deleteMedia: (id) => request(`/admin/media/${id}`, {
    method: 'DELETE',
  }),
};
