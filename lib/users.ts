import { User } from '~/models/User'
import axios from '~/lib/axios'

export const updateProfile = async (data: User, accessToken: string): Promise<User> => {
  const formData = new FormData()
  console.log(data.logo)

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const { data: user } = await axios.patch(`/profile`, formData, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
  })

  return user
}
