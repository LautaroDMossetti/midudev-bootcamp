import {gql} from '@apollo/client'
import { PERSON_ALL_DETAILS_FRAGMENT } from './graphql-fragments'

export const PERSON_ADDED = gql`
    subscription {
        personAdded {
            ...PersonAllDetails
        }
    }

    ${PERSON_ALL_DETAILS_FRAGMENT}
`