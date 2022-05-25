require('dotenv-flow').config();

export const keycloackConfig = {
    clientURL: process.env.KEYCLOAK_URL,
    clientID: process.env.KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    clientCredentions: process.env.KEYCLOAK_CLIENT_CREDENTIONS,
    grant_type: process.env.KEYCLOAK_GRANT_TYPE,
    clientToken: process.env.KEYCLOAK_CLIENT_TOKEN,
    clientRefreshToken: process.env.KEYCLOAK_CLIENT_REFRESH_TOKEN,
}