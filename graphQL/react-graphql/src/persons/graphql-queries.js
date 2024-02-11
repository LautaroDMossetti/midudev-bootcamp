import { gql } from '@apollo/client'
import { PERSON_ALL_DETAILS_FRAGMENT } from './graphql-fragments'

export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonAllDetails
    }
  }

  ${PERSON_ALL_DETAILS_FRAGMENT}
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
      findPerson (name: $nameToSearch) {
        ...PersonAllDetails
      }
  }

  ${PERSON_ALL_DETAILS_FRAGMENT}
`