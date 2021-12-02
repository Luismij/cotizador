import * as yup from 'yup'
import 'yup-phone-lite'

/**
 * Customer fields for create and edit:
 * Contacto, Logo, Nit, Dirección, Razón Social, Teléfono, Correo, y Dirección Web
 * name, nit, contact, logo, address, socialReason, phone, email, webpage
 */
const CustomerSchema = yup
  .object({
    name: yup.string().trim().required(''),
    nit: yup
      .string()
      .trim()
      .matches(/^(\d+|(\d{3}\.?)*)(\s?-?\s?\d)?$/, 'El nit solo contiene dígitos. e.g. XXX.XXX.XXX-Y')
      .typeError('El nit solo contiene dígitos. e.g. XXX.XXX.XXX - Y')
      .required(''),
    contact: yup.string().trim(),
    logo: yup.mixed(),
    address: yup.string().trim(),
    socialReason: yup.string().trim(),
    phone: yup.string().trim().phone('CO', 'El teléfono debe ser un teléfono válido'),
    email: yup.string().trim().email('El email debe ser un email válido'),
    webpage: yup.string().trim().url('La página web debe ser una url válida'),
  })
  .required()

export default CustomerSchema
