import axios from "axios";
const BASE = "localhost:5000/api";

export async function fetchAllLinks() {
  try {
    const { data } = await axios.get(`/api/links`);
    console.log(data, "THIS IS DATA_LINKS");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchLinksByTag(tag) {
  try {
    const { data } = await axios.get(`/api/tags/${tag}/links`);
    console.log(data, "THIS IS DATA_TAGS");
    return data;
  } catch (error) {
    throw error;
  }
}
