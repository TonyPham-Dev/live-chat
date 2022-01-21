import express, { Application } from "express";
import cors from "cors";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import variables from "../config/variables.config";
import helmet from "helmet";
import methodOverride from "method-override";

export const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${variables.auth0DomainUrl}/.well-known/jwks.json`,
    }),
    audience: variables.auth0Audience,
    issuer: `https://${variables.auth0DomainUrl}/`,
    algorithms: ["RS256"],
});

const middlewares = (app: Application) => {
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        cors({
            origin: variables.corsOrigin,
        })
    );
    app.use(methodOverride("_method"));
    app.use((_, res, next) => {
        res.removeHeader("X-Powered-By");
        next();
    });

    // app.use(jwtCheck)
};

export default middlewares;
