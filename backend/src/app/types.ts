export interface EnvVariables {
    dbUri: string;
    auth0DomainUrl: string;
    auth0Audience: string;
    auth0ClientSecret: string;
    m2mClientId: string;
    m2mClientSecret: string;
    port: string | number;
    googleClientId: string;
    googleClientSecret: string;
    googleRedirectUrl: string;
    corsOrigin: string;
    tokenExpiredHour: number;
}

export interface UserDataWithAccessToken {
    create_at: string;
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    identities: [
        {
            access_token: string;
            connection: string;
            expires_in: string;
            isSocial: boolean;
            provider: string;
            user_id: string;
        }
    ];
    last_ip: string;
    last_login: string;
    locale: string;
    logins_count: number;
    name: string;
    nickname: string;
    picture: string;
    updated_at: string;
    user_id: string;
}

export interface UserDataRes {
    success: boolean;
    message?: string;
    userData?: UserDataWithAccessToken;
}

export interface UserData {
    _id: string;
    nickname: string;
    avatarUrl: string;
    fullName: string;
    email: string;
    createdAt: Date;
    __v: number;
    id: string;
}
