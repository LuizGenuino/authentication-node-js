import { ENV } from "./utils/env.ts"


const hello: string = "Hello World!!"

console.log({hello, app_name:ENV.APP_NAME})