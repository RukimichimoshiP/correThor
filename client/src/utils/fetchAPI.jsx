export async function adminLogin(token){
    const url = 'http://localhost:3001/api/admin';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'authorizationtoken':token
        },
        credentials: 'include'
    });

    const data = await response.json();
    return data;
}

export async function getAllCorrectors(token){
    const url = 'http://localhost:3001/api/correctors';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'authorizationtoken':token
        },
        credentials: 'include'
    });

    const data = await response.json();
    return data;
}

export async function createNewCorrector(token, name){
    const url = 'http://localhost:3001/api/correctors';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'authorizationtoken':token
        },
        body: JSON.stringify({
            name
        }),
        credentials: 'include'
    });

    const data = await response.json();
    return data;
}

export async function editCorrector(token, id, name){
    const url = `http://localhost:3001/api/correctors/${id}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            'authorizationtoken':token
        },
        body: JSON.stringify({
            name
        }),
        credentials: 'include'
    });

    const data = await response.json();
    return data;
}

export async function deleteCorrector(token, id){
    const url = `http://localhost:3001/api/correctors/${id}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'authorizationtoken':token
        },
        credentials: 'include'
    });

    const data = await response.json();
    return data;
}

export async function getCorrectionsByCorrector(token, id){
    const url = `http://localhost:3001/api/corrections/${id}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type':'application/json',
            'authorizationtoken':token
        },
        credentials: 'include'
    });

    const data = await response.json();
    return data;
}

export async function createCorrection(token, correction){
    const url = `http://localhost:3001/api/corrections`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'authorizationtoken':token
        },
        body: JSON.stringify(correction),
        credentials: 'include'
    });

    const data = await response.json();
    return data;
}

export async function editCorrection(token, id, correction){
    const url = `http://localhost:3001/api/corrections/${id}`;

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
            'authorizationtoken':token
        },
        body: JSON.stringify(correction),
        credentials: 'include'
    });

    const data = await response.json();
    return data;
}

export async function deleteCorrection(token, id){
    const url = `http://localhost:3001/api/corrections/${id}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'authorizationtoken':token
        },
        credentials: 'include'
    });

    const data = await response.json();
    return data;
}