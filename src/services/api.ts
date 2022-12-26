import axios, { AxiosResponse } from 'axios'

class Api {
  static get = async <T>(url: string, params: any) =>
    axios<any, AxiosResponse<T>>(url, {
      method: 'GET',
      params,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.data)

  static post = async <T>(url: string, data: T) =>
    axios(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }).then((response) => response.data)

  static patch = async <T>(url: string, data: T) =>
    axios(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }).then((response) => response.data)

  static put = async <T>(url: string, data: T) =>
    axios(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    }).then((response) => response.data)

  static delete = async (url: string) =>
    axios(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.data)
}

export default Api
