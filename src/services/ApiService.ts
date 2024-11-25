import axios, {
    type AxiosResponse,
    type AxiosInstance,
    type AxiosRequestConfig,
    AxiosError
  } from 'axios'
  
  const baseURL = 'https://pokeapi.co/api/v2'
  
  const config: AxiosRequestConfig = {
    baseURL
  }
  
  function apiError(error: AxiosError): unknown {
    if (error && 'isAxiosError' in error && error.isAxiosError) {
      const { response } = error
      return { ...response }
    }
  }
  const apiService: AxiosInstance = axios.create(config)
  
  const errorHandler = (error: AxiosError) => {
    const isRespError = apiError(error)
    if (isRespError) {
      console.error(error)
    }
    return Promise.reject({ ...error })
  }
  
  const successHandler = (response: AxiosResponse) => {
    return response
  }
  
  apiService.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  )
  
  export default apiService
  