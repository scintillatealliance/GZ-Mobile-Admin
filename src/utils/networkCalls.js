import api from "../utils/axiosInstance";

export const getState = async () => {
  try {
      const response = await api.get('/dropdown/states');
      return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDistrict = async (stateId) => {
    try {
        const response = await api.get(`/dropdown/districts/${stateId}`);
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getConstituency = async (districtId) => {
    try {
        const response = await api.get(`/dropdown/talukas/district/${districtId}`);
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getBooth = async (talukaId) => {
    try {
        const response = await api.get(`/dropdown/booths/talukas/${talukaId}`);
        return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const createUser = async (userData) => {
    try {
        const response = await api.post(`/user-management`,userData);
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const boothLatLong = async (talukaId,File) => {
    try {
        const response = await api.post(`import-booth-data/csv/${talukaId}`,{file:File});
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const boothNames = async (talukaId,File) => {
    try {
        const response = await api.post(`/import-booth-name-data/${talukaId}`,{file:File});
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const boothAddress = async (talukaId,File) => {
    try {
        const response = await api.get(`/update-booth-data/address/${talukaId}`,{file:File});
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const voterData = async (talukaId,boothId,File) => {
    try {
        const response = await api.post(`/import/voterdata/${talukaId}/${boothId}`,{file:File});
        return response.data;
    } catch (error) {
      throw error;
    }
  };