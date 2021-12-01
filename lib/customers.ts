import { Customer } from '~/models/Customer'
import axios from '~/lib/axios'

export const createOne = async (data: Customer, accessToken: string): Promise<Customer> => {
  const { data: customer } = await axios.post('/customers', data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return customer
}

export const updateOne = async (id: number, data: Customer, accessToken: string): Promise<Customer> => {
  const { data: customer } = await axios.patch(`/customers/${id}`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return customer
}

export const deleteOne = async (id: number, accessToken: string): Promise<Customer> => {
  const { data: customer } = await axios.delete(`/customers/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return customer
}
