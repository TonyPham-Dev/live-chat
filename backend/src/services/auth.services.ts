import variables from "../config/variables.config"
import axios from "axios"
import { auth0 } from "../config/auth0.config"
import { UserDataWithAccessToken } from "../app/types"

export const getUserData: (
    authToken: string
) => Promise<UserDataWithAccessToken> = async (authToken) => {
    const accessTokenAndUserId = [
        auth0
            .clientCredentialsGrant({
                audience: variables.auth0Audience,
                scope: "read:user_idp_tokens",
            })
            .then((data: any) => data.access_token),
        axios
            .get(`https://${variables.auth0DomainUrl}/userinfo`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((data) => data.data.sub),
    ]
    const [accessToken, userId] = await Promise.all(accessTokenAndUserId)
    const userData = await axios
        .get<UserDataWithAccessToken>(
            `${variables.auth0Audience}users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        .then((data) => data.data)
    return userData
}

export const getContacts: (accessToken: string) => Promise<any> = async (
    accessToken
) => {
    const contacts = await axios
        .get(
            "https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        .then((data) => data.data)
    return contacts
}
