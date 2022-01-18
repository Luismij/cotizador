import * as yup from 'yup'

const PricingSchema = yup
  .object({
    number: yup.string().required('El número de cotización es requerido'),
    validSince: yup.date().required('La fecha de cotización es requerida'),
    validUntil: yup.date().required('La fecha de vencimiento es requerida'),
    customer: yup.object().required('El cliente es requerido').nullable(),
    details: yup.array().of(
      yup.object().shape({
        item: yup.string().nullable(),
        price: yup
          .number()
          .typeError('El precio debe ser un valor numérico')
          .required('El precio del item es requerido'),
        quantity: yup
          .number()
          .typeError('La cantidad debe ser un valor numérico')
          .required('La cantidad de items es requerido'),
      })
    ),
  })
  .required()

export default PricingSchema
