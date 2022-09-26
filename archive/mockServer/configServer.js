const api = {
  fetchApi: function (endPoint) {
    var encodedURI = window.encodeURI('http://localhost:8000/' + endPoint);
    console.log(encodedURI);

    return axios.get(encodedURI).then(function (response) {
      return response.data;
    });
  },
};

export default api;
