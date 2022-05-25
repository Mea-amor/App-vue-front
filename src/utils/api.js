import http from "./http-common";

const mocks = {
  auth: { POST: { token: "This-is-a-mocked-token" } },
  "user/me": { GET: { name: "doggo", title: "sir" } }
};

function fortmatResponse(res) {
  return JSON.stringify(res, null, 2);
}
const apiCall = ({ url, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mocks[url][method || "GET"]);
        // console.log(`Mocked '${url}' - ${method || "GET"}`);
        // console.log("response: ", mocks[url][method || "GET"]);
      } catch (err) {
        reject(new Error(err));
      }
    }, 1000);
  });

// eslint-disable-next-line no-unused-vars
const sendLogin = async () => {
  const postData = {
    title: this.$refs.post_title.value,
    description: this.$refs.post_description.value
  };
  try {
    const res = await http.post("/tutorials", postData, {
      headers: {
        "x-access-token": "token-value"
      }
    });
    const result = {
      status: res.status + "-" + res.statusText,
      headers: res.headers,
      data: res.data
    };
    this.postResult = fortmatResponse(result);
  } catch (err) {
    this.postResult = fortmatResponse(err.response?.data) || err;
  }
};
export default apiCall;
