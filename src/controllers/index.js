const { ProtocolEnum } = require("@spheron/storage");
const { SpheronClientObj } = require("../services/spheron.service");
const axios = require("axios");
const { v4: uuid } = require("uuid");

const initiateUpload = async (req, res, next) => {
  try {
    const { bucket } = req.query;
    const unique_id = uuid();
    const bucketName = bucket ? bucket : unique_id; // use which ever name you prefer
    const protocol = ProtocolEnum.IPFS; // use which ever protocol you prefer

    const { uploadToken, deploymentId } =
      await SpheronClientObj.createSingleUploadToken({
        name: bucketName,
        protocol,
      });

    res.status(200).json({
      uploadToken,
      deploymentId,
    });
  } catch (error) {
    next(error);
  }
};

const cancelUpload = async (req, res, next) => {
  try {
    const { deploymentId } = req.body;
    const url = `https://api-v2.spheron.network/v1/deployment/${deploymentId}/cancel`;

    const response = await axios({
      method: "post",
      url,
      headers: {
        authorization: `Bearer ${process.env.SPHERON_TOKEN}`,
      },
      data: {}
    });

    res.status(200).json(response);
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

module.exports = { initiateUpload, cancelUpload };
