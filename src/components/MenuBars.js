import WrapContent from './WrapContent'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'

const MenuBars = ({ setIsShowMenu }) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleRedirect = (path) => {
    setIsShowMenu(false)
    navigate(path)
  }

  return (
    <WrapContent className={classes.menuBars}>
      <Box className={classes.menuItem} onClick={() => handleRedirect('/')}>
        Trang chủ
      </Box>
      <Box
        className={classes.menuItem}
        onClick={() => handleRedirect('/analytics')}
      >
        Trang thống kê
      </Box>
    </WrapContent>
  )
}

const useStyles = makeStyles({
  menuBars: {
    position: 'absolute',
    width: 'max-content',
    zIndex: 999999,
    left: -102,
  },
  menuItem: {
    padding: '4px 8px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#363636',
    },
  },
})

export default MenuBars
