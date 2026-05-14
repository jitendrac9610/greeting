export const saveProfile = (data) => {
  localStorage.setItem("userProfile", JSON.stringify(data));
};

export const getProfile = () => {
  const data = localStorage.getItem("userProfile");

  return data ? JSON.parse(data) : null;
};

export const clearProfile = () => {
  localStorage.removeItem("userProfile");
};
