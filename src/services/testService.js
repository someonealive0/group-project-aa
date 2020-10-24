import axios from "axios"
// let proxy = ""

// if(process.env.FUNCTIONS_EMULATOR === true) {
//   proxy = "http://localhost:5001/comp3120-groupaa-project/us-central1/api"
// } 
// if (process.env.NODE_ENV === "production") {
//   proxy = ""
// }

const ROOT_URL = "/api/test/"


const test = () => {
    return axios.get(ROOT_URL + "test_msg")
    .then((response) => {
      return response.data
    })//
}

export default {
  test: test
}