const capitalize = (word?: string) => {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return '';
};

export { capitalize };
