require('dotenv-flow').config();

export const proxyConfig = {
    password: process.env.PROXY_PASSWORD,
    port: process.env.PROXY_PORT,
    server: process.env.PROXY_SERVER,
    user: process.env.PROXY_USER,
}