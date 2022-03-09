import { gql } from '@apollo/client'

export const GRAPHQL_GET_GLOBAL_CASES = gql`
  query {
    totalConfirmed
    totalConfirmedLast
    totalRecovered
    totalRecoveredLast
    totalDeaths
    totalDeathsLast
  }
`

export const GRAPHQL_GET_VIETNAM_CASES = gql`
  query provinces {
    provinces {
      Province_Name
      Confirmed
      Recovered
      Deaths
      Lat
      Long
    }
  }
`

export const GRAPHQL_GET_TOTAL_VIETNAM = gql`
  query totalVietNam {
    totalVietNam {
      confirmed
      recovered
      deaths
    }
  }
`
