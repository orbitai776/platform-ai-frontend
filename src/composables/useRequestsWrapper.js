
export default function useRequestsWrapper() {

  const makeGetRequest = async (url, params = {}, headers = {}, auth = true) => {
    const urlObj = new URL(url);
    Object.keys(params).forEach(key => {
      const value = params[key];
      
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          // Handle arrays
          value.forEach(item => {
            if (item !== null && item !== undefined) {
              urlObj.searchParams.append(`${key}[]`, item);
            }
          });
        } else {
          urlObj.searchParams.append(key, value);
        }
      }
    });

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
    };

    if (auth) {
      // Save access token to cookies or localStorage
      const accessToken = localStorage.getItem('access_token');
      options.headers.Authorization = `Bearer ${accessToken}`;
    }

    try {
      const response = await fetch(urlObj.toString(), options);

      if (!response.ok) {
        const errorData = await response.json();

        // Check if the token is expired or unauthorized
        if (errorData.statusCode === 'INTERNAL_SERVER'
          || errorData.message === 'UnauthorizedException'
        ) {
          return {
            status: 'error'
          }
        }

        return {
          status: errorData.status || response.status,
          statusText: errorData.message || response.statusText,
          error: errorData.error || response.error || 0,
          message: errorData.message || response.message || '',
          type: errorData.type || response.type || '',
          details: errorData.details || response.details || '',
        }
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return null;
    }
  };

  const makePostRequest = async (url, body, headers = {}, auth = true) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    };

    if (auth) {
      const accessToken = localStorage.getItem('access_token');
      options.headers.Authorization = `Bearer ${accessToken}`;
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();

        // Check if the token is expired or unauthorized
        if (errorData.statusCode === 'INTERNAL_SERVER'
          || errorData.message === 'UnauthorizedException'
        ) {
          return {
            status: 'error'
          } // Call auto-logout function
        }

        return {
          status: errorData.status || response.status,
          statusText: errorData.message || response.statusText,
          error: errorData.error || response.error || 0,
          message: errorData.message || response.message || '',
          type: errorData.type || response.type || '',
          details: errorData.details || response.details || '',
        }
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return null;
    }
  };
  
  return {
    get: makeGetRequest,
    post: makePostRequest
  }
}