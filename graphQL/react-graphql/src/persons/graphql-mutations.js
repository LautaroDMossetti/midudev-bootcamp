import { gql } from '@apollo/client'
import { PERSON_ALL_DETAILS_FRAGMENT } from './graphql-fragments'

export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
        name: $name
        phone: $phone
        street: $street
        city: $city
    ) {
      ...PersonAllDetails
    }
  }

  ${PERSON_ALL_DETAILS_FRAGMENT}
`

export const EDIT_PHONE_NUMBER = gql`
mutation editPhoneNumber($name: String!, $phone: String!) {
    editPhoneNumber(name: $name, phone: $phone) {
      ...PersonAllDetails
    }
  }

  ${PERSON_ALL_DETAILS_FRAGMENT}
`