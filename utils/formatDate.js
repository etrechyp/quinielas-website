export const dateFormat = (date) => {
  return new Date(date).toLocaleString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const dateNoYearFormat = (date) => {
  return new Date(date).toLocaleString("es-MX", {
    weekday: 'long',
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  });
};
