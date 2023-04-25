const { ProtocolEnum } = require("@spheron/storage");
const { SpheronClientObj } = require("../services/spheron.service");
const { v4: uuid } = require("uuid");

const initiateUpload = async (req, res, next) => {
  try {
    const { bucket } = req.query;
    const unique_id = uuid();
    const bucketName = bucket ? bucket : unique_id; // use which ever name you prefer
    const protocol = ProtocolEnum.IPFS; // use which ever protocol you prefer

    const { uploadToken } = await SpheronClientObj.createSingleUploadToken({
      name: bucketName,
      protocol,
    });

    res.status(200).json({
      uploadToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { initiateUpload };
