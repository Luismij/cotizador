import * as yup from 'yup'
import 'yup-phone-lite'

/**
 * Customer fields for create and edit:
 * Contacto, Logo, Nit, Dirección, Razón Social, Teléfono, Correo, y Dirección Web
 * name, nit, contact, logo, address, socialReason, phone, email, webpage
 */
const CustomerSchema = yup
  .object({
    name: yup.string().required(''),
    nit: yup
      .string()
      .matches(/^(\d+|(\d{3}\.?)*)(\s?-?\s?\d)?$/, 'El nit solo contiene dígitos. e.g. XXX.XXX.XXX-Y')
      .typeError('El nit solo contiene dígitos. e.g. XXX.XXX.XXX - Y')
      .required(''),
    contact: yup.string(),
    logo: yup.mixed(),
    address: yup.string(),
    socialReason: yup.string(),
    phone: yup.string().phone('CO', 'El teléfono debe ser un teléfono válido'),
    email: yup.string().email('El email debe ser un email válido'),
    webpage: yup.string().url('La página web debe ser una url válida'),
  })
  .required()

export default CustomerSchema
