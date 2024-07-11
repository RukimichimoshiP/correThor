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