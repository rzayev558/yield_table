import axios from "axios";

const API_BASE_URL = "https://yieldtables.org/v1";
export const fetchYieldTablesMeta = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/yield-tables-meta/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching yield tables meta:", error);
    throw error;
  }
};

export const fetchYieldTableData = async (id: number) => {
  try {
    const response = await axios.get(`/api/yield-tables/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching yield table data:", error);
    throw error;
  }
};
