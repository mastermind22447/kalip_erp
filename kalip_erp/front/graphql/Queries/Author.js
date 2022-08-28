import {gql} from '@apollo/client'

import {BOOK_FIELDS, AUTHOR_FIELDS} from '../Fragments'

export const LOAD_AUTHORS = gql`
${AUTHOR_FIELDS}
query Authors {
  users(groupTitle: "Author") {
    ...AuthorFields
  }
}


`;

export const LOAD_USER_SLUG = gql`
${AUTHOR_FIELDS}
${BOOK_FIELDS}
  query User($slug: String!) {
    user(slug: $slug) {
      ...AuthorFields
    }
    books(userSlug: $slug){
      ...BookFields
      user{
        ...AuthorFields
      }
    }
  }
`

export const LOAD_AUTHOR = gql`
${AUTHOR_FIELDS}
${BOOK_FIELDS}
  query User($id: Int!) {
    user(id: $id) {
      ...AuthorFields
    }
    books(authorId: $id){
      ...BookFields
      user{
        ...AuthorFields
      }
    }
  }
`