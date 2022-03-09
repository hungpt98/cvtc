import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const CircleLoading = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.loader}></Box>
    </Box>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  loader: {
    border: '5px solid #333333',
    borderRadius: '50%',
    borderTop: '5px solid #bdbdbd',
    width: '40px',
    height: '40px',
    '-webkit-animation': 'spin 2s linear infinite',
    animation: 'spin 2s linear infinite',
  },
})

export default CircleLoading
