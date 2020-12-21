import axios from 'axios'
export default function({ commit }, filterOptions) {
  const cancelTokenSource = axios.CancelToken.source()
  axios
    .post('getFilteredObjects', filterOptions, {
      cancelToken: cancelTokenSource.token,
    })
    .then(filteredEntitiesResponse => {
      if (!filteredEntitiesResponse) {
        return
      }
      const filteredEntitiesData = filteredEntitiesResponse.data
      if (
        !filteredEntitiesData ||
        Object.prototype.toString.call(filteredEntitiesData) !==
          '[object Object]' ||
        !Array.isArray(filteredEntitiesData.schema) ||
        !Array.isArray(filteredEntitiesData.objects)
      ) {
        console.error('!filteredEntitiesData or not an object')
        return
      }
      commit('setReport', filteredEntitiesData)
    })
    .catch(error => console.error(error))

  return cancelTokenSource
}
