const BASE_URL = 'http://localhost:5000';

const queryStringBuilder = params => '?' + Object.entries(params).map((x) => `${x[0]}=${x[1]}`).join('&');

const urlBuilder = (...path) => {
    let url = path
        .filter(x => x && typeof(x) == 'string')
        .join('/');

    let lastElement = path.pop();
    if (lastElement) {
        url += queryStringBuilder(lastElement);
    }

    return url;
};

const requestInitBase = async (contentType, method, body) => {
    // let token = await getToken();
    
    return {
        method,
         headers: {
            ...(contentType && {'Content-Type': contentType}),
            // ...(token && { 'id_token': token })
        },
        body
    };
};

const requestInit = requestInitBase.bind(null, 'application/json');

const responseHandler = async res => {
    console.log(res);
    if (!res.ok) {
        throw await res.json();
    }

    return res.json();
};

const requesterBuilder = BASE_URL => (endpoint, params) => ({
    getOne: id => requestInit('GET').then(reqBody => fetch(urlBuilder(BASE_URL, endpoint, id, params), reqBody)).then(responseHandler),

    getMany: () =>  requestInit('GET').then(reqBody => fetch(urlBuilder(BASE_URL, endpoint, params), reqBody)).then(responseHandler),

    create: data => requestInit('POST', JSON.stringify(data)).then(reqBody => fetch(urlBuilder(BASE_URL, endpoint, params), reqBody)).then(responseHandler),

    update: data => requestInit('PUT', JSON.stringify(data)).then(reqBody => fetch(urlBuilder(BASE_URL, endpoint, params), reqBody)).then(responseHandler),

    delete: () => requestInit('DELETE').then(reqBody => fetch(urlBuilder(BASE_URL, endpoint), reqBody, params)).then(responseHandler),

});

export default requesterBuilder(BASE_URL);
