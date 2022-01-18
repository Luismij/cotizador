import { PricingDetail } from './PricingDetail'
import { User } from './User'
import { Customer } from './Customer'

export interface Pricing {
  number: string
  validSince?: Date
  validUntil?: Date
  customer: Customer
  user: User
  details?: PricingDetail[]
}
