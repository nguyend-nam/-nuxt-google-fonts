export const useFilter = defineStore('filter', () => {
  const preview = ref('');
  const fontSize = ref(40);
  const searchTerm = ref('');

  const setPreview = (value: string) => {
    preview.value = value;
  };

  const setFontSize = (value: number) => {
    fontSize.value = value;
  };

  const setSearchTerm = (value: string) => {
    searchTerm.value = value;
  };

  return {
    preview,
    fontSize,
    searchTerm,
    setPreview,
    setFontSize,
    setSearchTerm,
  };
});
