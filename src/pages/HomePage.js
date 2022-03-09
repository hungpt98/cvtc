import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import DetailListCases from 'components/DetailListCases'
import VietnamMapCases from 'components/VietnamMapCases'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountriesCases } from 'store/covidSlice'
import {
  GRAPHQL_GET_VIETNAM_CASES,
  GRAPHQL_GET_TOTAL_VIETNAM,
} from 'api/apolloQueries'
import { useQuery } from '@apollo/client'
import { formatNumberWithCommas, getModelListCases } from 'utils'

const detailListCasesType = [
  {
    value: 'vietnam',
    label: 'Việt Nam',
  },
  {
    value: 'world',
    label: 'Thế giới',
  },
]

const HomePage = () => {
  const [detailCaseType, setDetailCaseType] = useState(
    detailListCasesType[0].value
  )

  const classes = useStyles()
  const dispatch = useDispatch()

  const [
    countriesCases,
    countriesCasesPromise,
    globalCases,
    globalCasesPromise,
  ] = useSelector(({ covidStore }) => [
    covidStore.countriesCases.data,
    covidStore.countriesCases.promiseStatus,
    covidStore.globalCases.data,
    covidStore.globalCases.promiseStatus,
  ])

  const [headerElementClientHeight] = useSelector(({ elementStore }) => [
    elementStore.headerElementClientHeight,
  ])

  const graphqlVietnamCases = useQuery(GRAPHQL_GET_VIETNAM_CASES)
  const graphqlTotalVietnam = useQuery(GRAPHQL_GET_TOTAL_VIETNAM)

  const homeHeight = useMemo(() => {
    return `calc(100vh - (${headerElementClientHeight}px + 20px)`
  }, [headerElementClientHeight])

  const vietnamListCases = useMemo(() => {
    return getModelListCases(graphqlVietnamCases.data?.provinces, 'vietnam')
  }, [graphqlVietnamCases.data?.provinces])

  const countriesListCases = useMemo(() => {
    return getModelListCases(countriesCases, 'countries')
  }, [countriesCases])

  const isCountriesCasesLoading = useMemo(() => {
    return countriesCasesPromise === 'pending'
  }, [countriesCasesPromise])

  const isGlobalCasesLoading = useMemo(() => {
    return globalCasesPromise === 'pending'
  }, [globalCasesPromise])

  const isDetailTypeVietnam = useMemo(() => {
    return detailCaseType === 'vietnam'
  }, [detailCaseType])

  const onDetailCaseChange = (event) => {
    setDetailCaseType(event.target.value)
  }

  useEffect(() => {
    dispatch(getCountriesCases())
  }, [dispatch])

  return (
    <Box
      className={classes.homePage}
      style={{
        height: homeHeight,
      }}
    >
      <VietnamMapCases
        center={[16.261525, 107.477996]}
        zoom={6}
        listMakers={vietnamListCases}
        isLoading={graphqlVietnamCases.loading}
      />
      <Box sx={{ width: '20%' }}>
        <select
          className={classes.selectDetailCase}
          onChange={onDetailCaseChange}
        >
          {detailListCasesType.map((detailCaseType) => (
            <option key={detailCaseType.value} value={detailCaseType.value}>
              {detailCaseType.label}
            </option>
          ))}
        </select>
        <DetailListCases
          isLoading={
            isDetailTypeVietnam
              ? graphqlVietnamCases.loading && graphqlTotalVietnam.loading
              : isCountriesCasesLoading && isGlobalCasesLoading
          }
          listCases={
            isDetailTypeVietnam ? vietnamListCases : countriesListCases
          }
          totalConfirmed={
            isDetailTypeVietnam
              ? graphqlTotalVietnam.data?.totalVietNam?.confirmed
              : globalCases?.cases
          }
          totalRecovered={
            isDetailTypeVietnam
              ? graphqlTotalVietnam.data?.totalVietNam?.recovered
              : globalCases?.recovered
          }
          totalDeaths={
            isDetailTypeVietnam
              ? graphqlTotalVietnam.data?.totalVietNam?.deaths
              : globalCases?.deaths
          }
          title={
            isDetailTypeVietnam
              ? `Số ca nhiễm ở Việt Nam là ${formatNumberWithCommas(
                  graphqlTotalVietnam.data?.totalVietNam?.confirmed
                )} ca`
              : `Tổng số ca nhiễm trên Thế Giới là ${formatNumberWithCommas(
                  globalCases?.cases
                )} ca`
          }
        />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles({
  homePage: {
    display: 'flex',
    gap: 12,
  },
  selectDetailCase: {
    color: '#bdbdbd',
    backgroundColor: '#212121',
    marginBottom: 12,
  },
})

export default HomePage
