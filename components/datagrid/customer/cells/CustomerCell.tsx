import { Avatar, Box, Link, Typography } from '@mui/material'
import { getMediaUrl } from '~/lib/media'

interface Props {
  logo?: string
  name?: string
  email?: string
}

const CustomerCell: React.FC<Props> = ({ logo, name, email }) => {
  return (
    <>
      <Avatar src={getMediaUrl(logo)} alt={name} sx={{ mr: 2 }} />
      <Box lineHeight={1}>
        <Typography variant="body2">{name}</Typography>
        {email && (
          <Link href={`mailto:${email}`} variant="caption" underline="hover" color="grey.700">
            {email}
          </Link>
        )}
      </Box>
    </>
  )
}

export default CustomerCell
