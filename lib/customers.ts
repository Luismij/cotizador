import { Customer } from '~/models/Customer'
import axios from '~/lib/axios'

export const createOne = async (data: Customer, accessToken: string): Promise<Customer> => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const { data: customer } = await axios.post('/customers', formData, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
  })
  return customer
}

export const updateOne = async (id: number, data: Customer, accessToken: string): Promise<Customer> => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const { data: customer } = await axios.patch(`/customers/${id}`, formData, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' },
  })
  return customer
}

export const deleteOne = async (id: number, accessToken: string): Promise<Customer> => {
  const { data: customer } = await axios.delete(`/customers/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return customer
}

export const getMany = async (accessToken: string): Promise<Customer[]> => {
  const { data: customers } = await axios.get<Customer[]>('/customers', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  return customers
}
