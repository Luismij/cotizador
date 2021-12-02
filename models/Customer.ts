export interface Customer {
  id?: number
  name: string
  nit: string
  socialReason?: string
  logo?: string | File
  internalComment?: string
  email?: string
  phone?: string
  webpage?: string
  address?: string
  contact?: string
  createdAt?: Date
  updatedAt?: Date
}
