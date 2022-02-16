import { Product } from '~/models/Product'
import axios from './axios'

export const search = async (accessToken: string, query: string, limit: 5): Promise<Product[]> => {
  const { data: pricings } = await axios.get<Product[]>('/products', {
    params: { s: { description: { $cont: query } } },
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  return pricings
}
