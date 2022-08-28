
import {gql} from '@apollo/client'


export const LOAD_USER_UID = gql`
    query User($uid: String!) {
        user(uid: $uid) {
            
            uid
            firstName
            lastName
            fullName
            email
            mobile
            bio
            gender
            birthDate
            slug
            imageUrl
            specialty

            country{
                uid
                countryCode
            }

        }
    }
`;