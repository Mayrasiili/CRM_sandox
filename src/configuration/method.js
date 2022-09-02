import JSONbig from 'json-bigint';

import APP from "./config.js";

export function sendPostData(endpoint, data = {}, method = 'POST', headers = {}, json = true) {
    return new Promise((resolve, reject) => {
        fetch(endpoint, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                ...headers,
                'Authorization': 'Token ' + localStorage.getItem(APP.TOKEN_KEY),
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'origin',
            body: JSONbig.stringify(data)
        }).then(response => {
            if (!response.ok) {
                // Reject the promise if the response is not valid (2xx)
                throw new Error(response.statusText);
            } else {
                return response.text()
            }
        }).then(data => {
            if(method === 'DELETE') return resolve(data)
            else {
                if(!json) resolve(data);
                data = JSONbig.parse(data);
                resolve(data);
            }
        }).catch((error) => {
            // Something went wrong
            if(APP.DEBUG === true) console.log(error)
            reject(false);
        });
    })
}

export function sendGetData(endpoint, headers = {}, json = true) {
    return new Promise((resolve, reject) => {
        fetch(endpoint, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                ...headers,
                'Authorization': 'Token ' + localStorage.getItem(APP.TOKEN_KEY)
            },
            redirect: 'follow',
            referrerPolicy: 'origin'
        }).then(response => {
            if (!response.ok) {
                // Reject the promise if the response is not valid (2xx)
                throw new Error(response.statusText);
            } else {
                if(!json) return response.text()
                return response.text()
            }
        }).then(data => {
            data = JSONbig.parse(data);
            resolve(data);
        }).catch((error) => {
            // Something went wrong
            if(APP.DEBUG === true) console.log(error)
            reject(error);
        });
    })
}

export function addressStringBuilder(addressObject) {
    let address = "";
    address += addressObject.street ? addressObject.street : "";
    address += addressObject.zipCode ? (address !== "" ? ", " : "") + addressObject.zipCode : "";
    address += addressObject.city ? (address !== "" ? " " : "") + addressObject.city : "";
    address += addressObject.country ? (address !== "" ? ", " : "") + addressObject.country : "";

    return address;
}
