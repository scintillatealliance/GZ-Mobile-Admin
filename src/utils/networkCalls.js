import api from "../utils/axiosInstance";



export const validAuth = async (token) => {
  try {
    const response = await api.post('/checkToken', {token:token});
      return response.data;
  } catch (error) {
    console.log(error,"success");
    throw error;
  }
};

export const login = async (username, password) => {
  try {
      const response = await api.post('/auth/login-with-email', { email:username, password });
      return response.data;
  } catch (error) {
    throw error;
  }
};


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

  export const boothLatLong = async (talukaId,file) => {
    try {
        const response = await api.post(`import-booth-data/csv/${talukaId}`,{file:file?.file},{
          headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const boothNames = async (talukaId,file) => {
    try {
        const response = await api.post(`/import-booth-name-data/${talukaId}`,{file:file?.file},{
          headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const boothAddress = async (talukaId,file) => {
    try {
        const response = await api.post(`/update-booth-data/address/${talukaId}`,{file:file?.file},{
          headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const voterData = async (talukaId,boothId,file) => {
    try {
        const response = await api.post(`/import/voterdata/${talukaId}/${boothId}`,{file:file?.file},{
          headers: {'Content-Type': 'multipart/form-data'}
        });
        return response.data;
    } catch (error) {
      throw error;
    }
  };