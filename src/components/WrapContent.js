import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import CircleLoading from './CircleLoading'

const WrapContent = ({ className, isLoading, children, ...otherProps }) => {
  const classes = useStyles()

  return (
    <Box className={clsx(classes.root, className)} {...otherProps}>
      {isLoading ? <CircleLoading /> : children}
    </Box>
  )
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#212121',
    border: '1px solid #363636',
  },
})

export default WrapContent
