import { Pricing } from '~/models/Pricing'
import axios from './axios'

export const getMany = async (accessToken: string): Promise<Pricing[]> => {
  const { data: pricings } = await axios.get<Pricing[]>('/pricings', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  return pricings
}
