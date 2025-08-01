
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key) {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : [];
}
