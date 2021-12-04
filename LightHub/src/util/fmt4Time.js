export const fmt4Time = (date) => {
  return new Date(date).toLocaleDateString().split('/').join('-');
}