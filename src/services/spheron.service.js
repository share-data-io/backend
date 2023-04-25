const { SpheronClient } = require("@spheron/storage");

// const SpheronClient = new SpheronClientClass({ token: process.env.SPHERON_TOKEN  });
const SpheronClientObj = new SpheronClient({
  token:process.env.SPHERON_TOKEN
});
// export default SpheronClient;

module.exports = {SpheronClientObj};

