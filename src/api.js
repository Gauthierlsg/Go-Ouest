export async function apiRequest(url, options = {}) {
  const request = {
    method: options.method || 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
  };

  if (options.body !== undefined) {
    request.body = JSON.stringify(options.body);
    request.headers['Content-Type'] = 'application/json';
  }

  let response;
  try {
    response = await fetch(url, request);
  } catch {
    throw new Error('API Vercel indisponible sur cet environnement.');
  }

  const data = await parseJsonResponse(response);
  if (!response.ok) {
    const error = new Error(data?.error || data?.message || `Erreur ${response.status}`);
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
}

async function parseJsonResponse(response) {
  const type = response.headers.get('content-type') || '';
  if (type.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}
