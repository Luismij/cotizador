import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
  label?: string
}

const SectionHeader: React.FC<Props> = ({ label, children }) => {
  return (
    <Paper sx={{ px: 4, py: 2, borderLeft: '0px' }} square>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="h1" fontWeight={400} color="primary">
          {label}
        </Typography>
        {children}
      </Box>
    </Paper>
  )
}

export default SectionHeader
