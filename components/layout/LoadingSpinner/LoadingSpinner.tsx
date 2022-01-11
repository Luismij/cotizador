import styles from './Spinner.module.css'
import Box from '@mui/material/Box'

interface Props {}

const LoadingSpinner: React.FC<Props> = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'primary.light',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={styles['sk-chase']} aria-label="Loading...">
        <div className={styles['sk-chase-dot']}></div>
        <div className={styles['sk-chase-dot']}></div>
        <div className={styles['sk-chase-dot']}></div>
        <div className={styles['sk-chase-dot']}></div>
        <div className={styles['sk-chase-dot']}></div>
        <div className={styles['sk-chase-dot']}></div>
      </div>
    </Box>
  )
}

export default LoadingSpinner
