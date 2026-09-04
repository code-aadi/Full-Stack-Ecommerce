let refreshPromise = null; 

async function fetchApi(url, options = {}, setAccessToken) {
    
    let response = await fetch(url, {
        ...options,
        credentials: "include",
    });

    if (response.status !== 401) {
        return response;
    }

   
    if (!refreshPromise) {
        refreshPromise = fetch("http://localhost:2310/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        }).finally(() => {
            refreshPromise = null; 
        });
    }

    const refreshResponse = await refreshPromise;

    if (refreshResponse.status === 403) {
        setAccessToken(null);
        window.location.href = "/login";
        return refreshResponse;
    }

    if (!refreshResponse.ok) {
        setAccessToken(null);
        window.location.href = "/login";
        return response;
    }

    const data = await refreshResponse.json();
    const newAccessToken = data.accessToken;
    
    setAccessToken(newAccessToken);

    const retryOptions = {
    ...options,
    headers: {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
    },
};

    response = await fetch(url, {
        ...retryOptions,
        credentials: "include",
    });

    return response;
}

export default fetchApi;