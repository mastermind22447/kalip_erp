import {gql} from '@apollo/client'

export const BOOK_FIELDS = gql`
fragment BookFields on BookType {
    id
    uid
    title
    slug
    summary
    desc
    image
    imageUrl
    categories{
        uid
        title
    }
    likes{
      uid
    }
    dislikes{
      uid
    }
    subscribes{
      uid
    }
    notifiers{
      uid
    }
    subscribeCount
    likeCount
    notifyCount
    dislikeCount
  }
`;


export const AUTHOR_FIELDS = gql`
fragment AuthorFields on UserType {
    id
    uid
    fullName
    specialty
    slug
    bio
    bigImage
    image
    imageUrl
    language{
        uid
        name
        iso
        isActive
      }
      country{
        uid
        countryName
        isoCode
        isActive
      }
}
`;