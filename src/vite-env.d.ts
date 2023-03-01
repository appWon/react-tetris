/// <reference types="vite/client" />

declare module "chatModule/Chat";

declare namespace NodeJS {
    interface ProcessEnv {
        [key: string]: any;
    }
}
