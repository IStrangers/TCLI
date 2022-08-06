const axios = require("axios")

axios.interceptors.response.use(res => {
  return res.data;
})

async function fetchRepoList() {
  return axios.get(`https://gitee.com/api/v5/users/QQXQQ/repos`)
}

async function fetchTagList(repo) {
  return axios.get(`https://gitee.com/api/v5/repos/QQXQQ/${repo}/tags`)
}

module.exports = {
  fetchRepoList,
  fetchTagList,
}