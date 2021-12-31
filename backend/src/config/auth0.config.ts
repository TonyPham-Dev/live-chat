import { AuthenticationClient } from "auth0"
import variables from "../config/variables.config"

export const auth0 = new AuthenticationClient({
    domain: variables.auth0DomainUrl,
    clientId: variables.m2mClientId,
    clientSecret: variables.m2mClientSecret,
})
