import { EnvVariables } from "../app/types"
import dotenv from "dotenv"
dotenv.config()

const variables: EnvVariables = {
    dbUri: process.env.DB_URI || "",
    auth0DomainUrl: process.env.AUTH0_DOMAIN_URL || "",
    auth0Audience: process.env.AUTH0_AUDIENCE || "",
    m2mClientId: process.env.M2M_CLIENT_ID || "",
    m2mClientSecret: process.env.M2M_CLIENT_SECRET || "",
    port: process.env.PORT || 3000,
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    googleRedirectUrl: process.env.GOOGLE_REDIRECT_URL || "",
    corsOrigin: process.env.CORS_ORIGIN || "",
}

export default variables
