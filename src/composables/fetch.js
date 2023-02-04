import ref from 'vue'

export function useFetch(url, options) {
  const data = ref(null)
  const error = ref(null)

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((error) => (error.value = error))

  return { data, error }
}
