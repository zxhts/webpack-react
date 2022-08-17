import { defineApi } from "src/util/defineApi";

export const getEnv = defineApi(
    3,
    {
        cordova: (param) => {
            return `cordova环境，${param}`
        }
    }
)