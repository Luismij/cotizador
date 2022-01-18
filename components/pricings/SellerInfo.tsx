import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { mediaLoader } from '~/lib/media'

import { User } from '~/models/User'

interface Props {
  profile: User
}

const SellerInfo: React.FC<Props> = ({ profile }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          width: 160,
          height: 80,
          position: 'relative',
        }}
      >
        <Image
          src={profile?.logo}
          loader={mediaLoader}
          alt={`Logo de ${profile?.name}`}
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <Typography color="text.secondary" variant="body1" sx={{ fontWeight: 700 }}>
        {profile?.name ?? <Skeleton width={200} height={100} />}
      </Typography>
      <Typography color="text.secondary" variant="body1">
        {profile?.nit ?? <Skeleton width={200} height={100} />}
      </Typography>
      <Typography color="text.secondary" variant="body1">
        {profile?.phone ?? <Skeleton width={200} height={100} />}
      </Typography>
      <Typography color="text.secondary" variant="body1">
        {profile?.email ?? <Skeleton width={200} height={100} />}
      </Typography>
      <Typography color="text.secondary" variant="body1">
        {profile?.webpage ?? <Skeleton width={200} height={100} />}
      </Typography>
    </Box>
  )
}

export default SellerInfo
