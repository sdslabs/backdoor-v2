import api from '../config'
import { ConfigResponse } from '../types'

export const configureService = {
  getConfigs: () => api.get<ConfigResponse>('/info/competition-info'),
  updateConfigs: (data: Partial<ConfigResponse>) => api.post('/info/configs', data),
  uploadLogo: (file: File) => {
    const formData = new FormData()
    formData.append('logo', file)
    return api.post('/info/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}