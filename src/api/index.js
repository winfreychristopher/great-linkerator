import axios from 'axios';

const BASE = "http://localhost:5000/api"

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLinks() {
  try {
    const {data} = await axios.get(`/api/links`)
    return data
  } catch(error) {
    throw error
  }
}