
import {gql} from '@apollo/client'

import {BOOK_FIELDS, AUTHOR_FIELDS} from '../Fragments'

export const LOAD_BOOK = gql`
${BOOK_FIELDS}
${AUTHOR_FIELDS}
query Book($id: Int!){
  book(id: $id){
    ...BookFields
    relatedBooks{
        ...BookFields
        
        user{
            ...AuthorFields
        }
    }
    user{
      ...AuthorFields
    }
    stages{
      uid
      status
      stageDate
      duration
      amount
      book{
        uid
        title
      }
      reserve{
        uid
        firstName
        lastName
        reservedAt
      }
    }
  }
}
`;

export const LOAD_BOOK_UID = gql`
    query Books($userUid: String!) {
        books(userUid: $userUid) {
            uid
            title
            slug
            imageUrl
            isActive
        }
    }
`;

export const LOAD_USER_STAGES = gql`
 query Stages($userUid: String!){
  stages(userUid:$userUid){
    uid
    stageDate
    duration
    status
    amount
    book{
      uid
      title
    }
  }
}
`

export const LOAD_BOOKS = gql`
${BOOK_FIELDS}
${AUTHOR_FIELDS}
query Books{
  books{
    ...BookFields
    user{
      ...AuthorFields
    }
  }
}

`;