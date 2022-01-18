export interface Product {
  id: number
  sku: string
  price: number
  photo?: string
  catapromId?: string
  categoryId?: string
  internalComment?: string
  createdAt: Date
  updatedAt: Date
}
