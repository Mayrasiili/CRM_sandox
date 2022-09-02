const SERVER_ADDRESS = process.env.REACT_APP_SERVERHOST;

const APP = {
    DEBUG: true,
    TOKEN_KEY: "login_token",
    CONTACT_TYPES: {
        EMAIL_TYPES: ["email", "workmail", "othermail"],
        PHONE_TYPES: ["homephone", "gsm", "workphone", "otherphone"]
    },

    SERVER_ENDPOINTS: {
        LOGIN: SERVER_ADDRESS + "user-auth/",                                   // POST
        LOGOUT: SERVER_ADDRESS + "api-auth/logout/",                            // GET
        LOGIN_CHECK: SERVER_ADDRESS + "checkuser/",                             // GET

        PEOPLE_LIST: SERVER_ADDRESS + "people/",                                // GET
    }
}

export default APP
