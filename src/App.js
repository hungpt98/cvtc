import HeaderLayout from 'layouts/HeaderLayout'
import MainLayout from 'layouts//MainLayout'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useQuery } from '@apollo/client'
import { GRAPHQL_GET_GLOBAL_CASES } from 'api/apolloQueries'

const App = () => {
  const classes = useStyles()

  const graphqlGlobalCases = useQuery(GRAPHQL_GET_GLOBAL_CASES)

  return (
    <Box className={classes.root}>
      <HeaderLayout graphqlGlobalCases={graphqlGlobalCases} />
      <MainLayout graphqlGlobalCases={graphqlGlobalCases} />
    </Box>
  )
}

const useStyles = makeStyles({
  root: {},
})

export default App
