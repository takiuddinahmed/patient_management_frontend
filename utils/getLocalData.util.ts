export const getLocalHostData = async (key: string) => {
  return localStorage.getItem(key);
};

export const setLocalHostData = async (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalHostData = async (key: string) => {
  localStorage.removeItem(key);
};
