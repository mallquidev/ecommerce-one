const url = 'http://localhost:3000/api/auth';

export const login = async (usuario, contrasena) => {
  const response = await fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuario, contrasena }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al iniciar sesión');
  }
  return data;
};
