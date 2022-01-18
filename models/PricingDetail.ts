import { Product } from './Product'

export interface PricingDetail {
  id?: number
  item?: string
  product?: Product
  price: number
  quantity: number
  vat?: number
  discount?: number
  subtotal?: number
  marking?: string
  inks?: string
  internalComment?: string
  createdAt?: Date
  updatedAt?: Date
}
