import axios from "axios"

const ROOT_URL = "/"

const test = () => {
    return axios.get(ROOT_URL + "test_msg")
    .then((response) => {
      return response.data
    })
}

export default {
  test: test
}