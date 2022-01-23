import { EnvVariables } from "../app/types";
import dotenv from "dotenv";
dotenv.config();

const dbUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DB}?authSource=${process.env.DB_DB}`;

const variables: EnvVariables = {
    dbUri: dbUri || "",
    auth0DomainUrl: process.env.AUTH0_DOMAIN_URL || "",
    auth0Audience: process.env.AUTH0_AUDIENCE || "",
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET || "",
    m2mClientId: process.env.M2M_CLIENT_ID || "",
    m2mClientSecret: process.env.M2M_CLIENT_SECRET || "",
    port: process.env.PORT || 3000,
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    googleRedirectUrl: process.env.GOOGLE_REDIRECT_URL || "",
    corsOrigin: process.env.CORS_ORIGIN || "",
    tokenExpiredHour: Number(process.env.TOKEN_EXPIRED_HOUR) || 1,
};

export default variables;
