export default function useRequestsWrapper() {
const makeGetRequest = async (url, params = {}, headers = {}) => {

  const query = new URLSearchParams()

  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value !== null && value !== undefined && value !== '') {
      query.append(key, value)
    }
  })

  const finalUrl = query.toString()
    ? `${url}?${query.toString()}`
    : url

  const response = await fetch(finalUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include'
  })

  return await response.json()
}
  const makePostRequest = async (url, body, headers = {}) => {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body),
      credentials: 'include'
    })

    return await response.json()
  }

  return {
    get: makeGetRequest,
    post: makePostRequest
  }
}