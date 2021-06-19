import axios from "axios";
const BASE = "localhost:5000/api";

export async function fetchAllLinks() {
  try {
    const { data } = await axios.get(`/api/links`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchLinksByUrl(url) {
  try {
    const { data } = await axios.get(`/api/links`, { params: { url }});
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchLinksByTag(tag) {
  try {
    const { data } = await axios.get(`/api/tags/${tag}/links`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateClicker(id) {
  try {
    return await axios.patch(`/api/links/${id}/clicks`,
     {
      header: {
              'Content-Type': 'application/json'
            }, 
    },
    )
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  } catch(error) {
    console.error(error)
  }
}
