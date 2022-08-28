import {gql} from '@apollo/client'
import {BOOK_FIELDS, AUTHOR_FIELDS} from './Fragments'

export const LOAD_AUTHORS = gql`
query Authors {
  users(groupTitle: "Author") {
    uid
    fullName
    specialty
    bio
    bigImage
    image
    imageUrl
    language {
      uid
      name
      iso
      isActive
    }
    country {
      uid
      countryName
      isoCode
      isActive
    }
  }
}


`;




export const LOAD_SECTIONS = gql`
  query sections{
    sections{
      id,
      title,
      desc,
      image,
      linkText,
      linkUrl
    }
  }
`;

export const LOAD_AUTHOR = gql`
  query Author($id: Int!) {
    user(id: $id) {
      uid
      fullName
      specialty
      bio
      bigImage
      image
      imageUrl
      language {
        uid
        name
        iso
        isActive
      }
      country {
        uid
        countryName
        isoCode
        isActive
      }
    }
  }
`


export const LOAD_PAGE = gql`
${BOOK_FIELDS}
${AUTHOR_FIELDS}
  query FirstPage($pageId: Int, $pageTitle: String){
    sections(pageId: $pageId, pageTitle: $pageTitle) {
      id
      title
      desc,
      image,
      linkUrl,
      linkText,
      exClass,
      page{
        id
        title
      }
      component{
        id
        title
      }
    }

    books{
      ...BookFields
      user{
        ...AuthorFields
      }
    }

    users {
      ...AuthorFields
    }

  }
`

export const LOAD_SECTION = gql`
  query Section($id: Int!){
    section(id: $id) {
      id
      title
      desc,
      image,
      linkUrl,
      linkText
    }
  }
`
