const units = ['байт', 'Кбайт', 'Мбайт', 'Гбайт', 'Тбайт'];

function getReadableSize(size) {
  if (size === 0) return `${size} ${units[size]}`;
  const mil = 1024;
  const i = Math.floor(Math.log(size) / Math.log(mil));
  return `${parseFloat((size / (mil ** i)).toFixed(2))} ${units[i]}`;
}

export default getReadableSize;
