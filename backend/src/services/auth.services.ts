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
                scope: "read:users",
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
