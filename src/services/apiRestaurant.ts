const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

export const getMenu = async () => {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data;
};

export const getOrder = async (orderId: string) => {
  const res = await fetch(`${API_URL}/order/${orderId}`);
  if (!res.ok) throw Error(`Couldn't find order #${orderId}`);

  const { data } = await res.json();
  return data;
};

export const createOrder = async (newOrder: any) => {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
};

export const updateOrder = async (id: string, updateObj: any) => {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
};
