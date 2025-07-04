import axios from 'axios'
import dayjs from 'dayjs'
import {toast} from 'react-toastify'

export const api=axios.create({
    baseURL:'http://localhost:3000/api'
})


export const getAllProperties=async()=>{
    try {
        const response=await api.get("/residency/all", {timeout:10*1000});
        if(response.status===400||response.status===500){
            throw response.data;
        }
        return response.data;
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
};

export const getProperty = async (id) => {
    try {
      const response = await api.get(`/residency/${id}`, {
        timeout: 10 * 1000,
      });
  
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
      return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  };

export const createUser=(email,token)=>{
  try {
    api.post(`/user/register`,{email},
      {headers:{
        Authorization:`Bearer ${token}`,
      }}
    )
  } catch (error) {
    toast.error("something went wrong pls try again..")
    throw error;
  }
}

export const bookVisit=async(date,propertyId,email,token)=>{
  try {
    await api.post(`./user/bookVisits/${propertyId}`,
      {
        email,
        id:propertyId,
        date:dayjs(date).format("DD/MM/YYYY")
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
  } catch (error) {
    toast.error("something went wrong")
    throw error;
  }
}

export const removeBooking=async(id,email,token)=>{
  try {
    await api.post(`./user/cancelBooking/${id}`,
      {
        email,
        
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
  } catch (error) {
    toast.error("something went wrong")
    throw error;
  }
}

export const toFav=async(id,email,token)=>{
  try {
    await api.post(`./user/toFav/${id}`,
      {
        email,
        
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    
  } catch (error) {
    toast.error('something went wrong')
    throw error
  }
}

export const allFav=async(email,token)=>{
  if(!token) return
  try {
    const res=await api.post(`/user/allFav`,
      {
        email,
        
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    // console.log(res)
    return res.data.data["favResidenciesID"]
    
  } catch (error) {
    toast.error("something went wrong while fetching")
    throw error
  }
}

export const allBookings=async(email,token)=>{
  if(!token) return
  try {
    const res=await api.post(`/user/allBookings`,
      {
        email,
        
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    // console.log(res)
    return res.data.data["bookedVisits"]
    
  } catch (error) {
    toast.error("something went wrong while fetching")
    throw error
  }
}

export const createResidency = async (data, token) => {
  console.log(data)
  try{
    const res = await api.post(
      `/residency/create`,
      {
        data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }catch(error)
  {
    throw error
  }
}