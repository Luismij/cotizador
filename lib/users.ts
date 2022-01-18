import { User } from '~/models/User'
import axios from '~/lib/axios'

export const updateProfile = async (data: User, accessToken: string): Promise<User> => {
  // If it's a FileList, it was not updated.
  if ((data?.logo as any) instanceof FileList) {
    delete data.logo
  }

  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const { data: user } = await axios.patch(`/profile`, formData, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
  })

  return user
}

export const getProfile = async (accessToken: string): Promise<User> => {
  const { data: profile } = await axios.get<User>(`/profile`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return profile
}
