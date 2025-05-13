import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    login: async (rollNumber, password) => {
        const response = await api.post('/auth/login', { roll_number: rollNumber, password });
        if (response.data.success) {
            localStorage.setItem('token', response.data.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

// Dashboard API calls
export const dashboardAPI = {
    getDashboardData: async (studentId) => {
        const response = await api.get(`/dashboard/${studentId}`);
        return response.data;
    }
};

// Courses API calls
export const coursesAPI = {
    getCourses: async () => {
        const response = await api.get('/courses');
        return response.data;
    },
    getCourseDetails: async (courseId) => {
        const response = await api.get(`/courses/${courseId}`);
        return response.data;
    }
};

// Attendance API calls
export const attendanceAPI = {
    getAttendance: async (studentId) => {
        const response = await api.get(`/attendance/${studentId}`);
        return response.data;
    }
};

// Assessments API calls
export const assessmentsAPI = {
    getAssessments: async (studentId) => {
        const response = await api.get(`/assessments/${studentId}`);
        return response.data;
    },
    submitAssessment: async (assessmentId, data) => {
        const response = await api.post(`/assessments/${assessmentId}/submit`, data);
        return response.data;
    },
    uploadAssessment: async (assessmentId, formData) => {
        const response = await api.post(`/assessments/${assessmentId}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
};

// Certificates API calls
export const certificatesAPI = {
    getCertificates: async (studentId) => {
        const response = await api.get(`/certificates/${studentId}`);
        return response.data;
    },
    downloadCertificate: async (certificateId) => {
        const response = await api.get(`/certificates/${certificateId}/download`, {
            responseType: 'blob',
        });
        return response.data;
    }
}; 