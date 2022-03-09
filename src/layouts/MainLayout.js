import HomePage from 'pages/HomePage'
import AnalyticsPage from 'pages/AnalyticsPage'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const MainLayout = ({ graphqlGlobalCases }) => {
  const classes = useStyles()

  return (
    <Box className={classes.mainLayout}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/analytics"
          element={<AnalyticsPage graphqlGlobalCases={graphqlGlobalCases} />}
        />
      </Routes>
    </Box>
  )
}

const useStyles = makeStyles({
  mainLayout: {
    marginTop: '12px',
  },
})

export default MainLayout
