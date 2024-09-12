export function validateApiKey(apiKey) {
  return apiKey === process.env.API_KEY;
}

export function validateRequestTime(requestTime) {
  const time = parseInt(requestTime, 10);
  return !isNaN(time);
}

export async function fetchWithAuth(url, options = {}) {
  const headers = {
    ...options.headers,
    'X-Api-Key': process.env.API_KEY,
    'X-Request-Time': Date.now().toString(),
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}
