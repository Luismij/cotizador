import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

interface Props {
  contact?: string
  phone?: string
}

const ContactCell: React.FC<Props> = ({ contact, phone }) => {
  return (
    <Box lineHeight={1}>
      <Typography variant="body2">{contact}</Typography>
      {phone && (
        <Link href={`tel:${phone}`} variant="caption" underline="hover" color="grey.700">
          {phone}
        </Link>
      )}
    </Box>
  )
}

export default ContactCell
