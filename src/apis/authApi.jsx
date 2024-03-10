// ====================================================================
const url = "https://7afcf51d-12b6-46b9-b582-68912b50ff6c-00-2cmx7cuplqvx6.spock.replit.dev/";
// ====================================================================
const jsonHeaderTypeA = {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
};
// ====================================================================
/**
 * @param string        subURL                     The API's name. (E.g. login, logout, register).
 * @param string        method                     Request Type (GET, POST, PUT, PATCH, DELETE).
 * @param string        body                       The JSON content of the request.
 * @param function      onSuccessfulCallback       Callback when API succeeded.
 * @param function      onFailedCallback           Callback when API failed.
 */
export default async function callServerAPI(
    subURL, method, header, body,
    onSuccessfulCallback = null, onFailedCallback = null) {
    const response = await fetch(url + subURL, {
        method: method,

        // *default, no-cache, reload, force-cache, only-if-cached
        cache: "no-cache",

        // no-cors, *cors, same-origin
        mode: "cors",

        credentials: "same-origin",
        headers: header,

        // manual, follow, error
        redirect: "follow",

        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        referrerPolicy: "no-referrer",

        // "body" data type must match "Content-Type" heade
        body: body
    });

    return response;
}

export { jsonHeaderTypeA };
// ====================================================================