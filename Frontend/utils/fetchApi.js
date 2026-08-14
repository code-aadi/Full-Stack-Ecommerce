

async function fetchApi(url, options = {}, setAccessToken){

    let response = await fetch(url,options)

    if(response.status !== 401){
        return response
    }

    const refreshResponse = await fetch("http://localhost:2310/api/auth/refresh",{
        method : "POST",
        credentials : "include"
    })
    if(!refreshResponse.ok){
        return response
    }
    const data = await refreshResponse.json()
    const newAccessToken = data.accessToken
 setAccessToken(newAccessToken)
    options.headers = {
        ...options.headers,
        Authorization : `Bearer ${newAccessToken}`
    }
    response = await fetch(url, options)
    return response
}

 export default fetchApi