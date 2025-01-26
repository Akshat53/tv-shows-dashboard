// src/services/api.js
const BASE_URL = '/services';

export const fetchShows = async (page = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/shows?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch shows (HTTP ${response.status})`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};