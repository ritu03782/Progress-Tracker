const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, { method = "GET", body, isFormData = false } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: "include", // send/receive the httpOnly cookies the backend sets
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // no JSON body (e.g. some error responses) — leave payload null
  }

  if (!res.ok) {
    const message = payload?.message || `Request failed (${res.status})`;
    const error = new Error(message);
    error.status = res.status;
    error.errors = payload?.errors;
    throw error;
  }

  return payload?.data;
}

export default request;
