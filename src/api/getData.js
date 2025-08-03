import axios from 'axios';
const baseURL = 'https://nexus-backend-z66y.onrender.com/';

// Get JWT authentication token from localStorage
function getAuthToken() {
  const token = localStorage.getItem('access_token') || localStorage.getItem('authToken');
  return token ? `Bearer ${token}` : null;
}

// Get user info from localStorage
function getUserInfo() {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
}

export async function getData(url) {
  try {
    const authToken = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (authToken) {
      headers.Authorization = authToken;
    }
    
    const response = await axios({
      method: 'GET',
      url: `${baseURL}api/v1/${url}`,
      headers,
    });
    return response.data;
  } catch (error) {
    console.log('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('userInfo');
      window.location.href = '/signin';
    }
    throw error;
  }
}

export async function sendData(url, body) {
  try {
    const authToken = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (authToken) {
      headers.Authorization = authToken;
    }
    
    const response = await axios({
      method: 'POST',
      url: `${baseURL}api/v1/${url}`,
      headers,
      data: JSON.stringify(body),
    });
    return response.data;
  } catch (error) {
    console.log('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('userInfo');
      window.location.href = '/signin';
    }
    throw error;
  }
}

export async function deleteData(url, body) {
  try {
    const authToken = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (authToken) {
      headers.Authorization = authToken;
    }
    
    const response = await axios({
      method: 'DELETE',
      url: `${baseURL}api/v1/${url}`,
      headers,
      data: JSON.stringify(body),
    });
    return response.data;
  } catch (error) {
    console.log('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('userInfo');
      window.location.href = '/signin';
    }
    throw error;
  }
}



export async function signUp(body) {
  try {
    const response = await axios({
      method: 'POST',
      url: `${baseURL}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
    });
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
}