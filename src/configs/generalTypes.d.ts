declare namespace NodeJS {
    interface ProcessEnv {
        WEB_PORT: string
        WEB_HOST: string
        USERDB: string
        PASSWORD: string
        HOST: string
        DATABASE: string
        ROUTE_PATH: string
        REFRESH_TOKEN_SECRET: string
        ACCESS_TOKEN_SECRET: string
    }
}