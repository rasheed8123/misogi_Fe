// allApis.js or apiEndpoints.js
import api from '../api'; // Axios instance

// Auth APIs
export const loginService = (credentials) => api.post('api/auth/login', credentials);
export const registerService = (details) => api.post('api/auth/register', details);

// User APIs
export const getUserProfile = () => api.get(`api/user/profile`);
export const updateProfileTheme = (themeId) => api.post(`api/portfolio/theme`, themeId);
export const createCaseStudy = (data) => api.post(`api/casestudy`, data);

export const getMyPortfolio = () => api.get(`api/portfolio`);
export const getCaseStudyById = (id) => api.get(`/api/casestudy/${id}`);
export const getCaseStudyByIdforPublic = (id) => api.get(`/api/casestudy/public/${id}`);

export const updateCaseStudy = (id, data) => api.put(`/api/casestudy/${id}`, data);
export const getPortfolioByUsername = (name) => api.get(`/api/portfolio/${name}`);

export const portfolioAnalytics = () => api.get('api/portfolio/analytics');
export const createPost = (data) => api.post('api/posts', data);
