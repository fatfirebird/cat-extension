import axios, { AxiosInstance, AxiosPromise } from 'axios'
import { TCat } from './api.types'

class Api {
  public instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.thecatapi.com/v1',
    })

    this.instance.interceptors.request.use((config) => {
      // eslint-disable-next-line no-undef
      const key = process.env.API_KEY as string

      config.headers = {
        ...config.headers,
        'x-api-key': key,
      }

      return config
    })

    this.instance.interceptors.response.use((response) => {
      return response.data
    })
  }

  public readonly cats = {
    get: (): AxiosPromise<TCat[]> => this.instance.get('/images/search?mime_types=jpg,png'),
  }
}

export const api = new Api()
