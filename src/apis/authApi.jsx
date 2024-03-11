// ====================================================================
const url = "https://7afcf51d-12b6-46b9-b582-68912b50ff6c-00-2cmx7cuplqvx6.spock.replit.dev/";
// ====================================================================
let sessionToken = null;

export function setSessionToken(token) {
    localStorage.setItem("JWToken", JSON.stringify({ token: token }));
    sessionToken = token;

    return token;
}

export function getSessionToken() {
    return JSON.parse(localStorage.getItem("JWToken", { token: null }));
}
// ====================================================================
/**
 * @param string        subURL                     The API's name. (E.g. login, logout, register).
 * @param string        method                     Request Type (GET, POST, PUT, PATCH, DELETE).
 * @param string        body                       The JSON content of the request.
 * @param function      onSuccessfulCallback       Callback when API succeeded.
 * @param function      onFailedCallback           Callback when API failed.
 */
export async function callServerAPI(subURL, method = "GET", body = {},
    onSuccessfulCallback = null, onFailedCallback = null) {
    const fullURL = url + subURL;

    // Debug
    //console.log("URL:", fullURL);

    try {
        const response = await fetch(fullURL, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "User-Agent": "React.js Web",
                "Authorization": sessionToken ? ("Bearer " + sessionToken) : null
            },

            // "body" data type must match "Content-Type" heade
            body: method === "GET" ? null : JSON.stringify(body)

            // *default, no-cache, reload, force-cache, only-if-cached
            //cache: "no-cache",

            // no-cors, *cors, same-origin
            //mode: "cors",

            // manual, follow, error
            //redirect: "follow",

            //credentials: "include",

            // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //referrerPolicy: "no-referrer",
        });

        const result = await response.json();

        // Debug
        console.log("Result.", result);

        if (result.success || result.success === "true") {
            if (onSuccessfulCallback)
                onSuccessfulCallback(result);
        }
        else {
            if (onFailedCallback)
                onFailedCallback(result && result.error ? result.error : null);
        }
    }
    catch (error) {
        // Debug
        // console.log("[On API] Yielded an error.", error);

        if (onFailedCallback)
            onFailedCallback(error);
    }

}

export { sessionToken };
// ====================================================================