import { gql } from '@apollo/client'

export const PERSON_ALL_DETAILS_FRAGMENT = gql`
    fragment PersonAllDetails on Person {
      id
      name
      phone
      address {
        street
        city
      }
    }
`