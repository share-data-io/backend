const checkRequest = async (req, res, next) => {
  if (
    process.env.ENV === "prod" &&
    req.headers.referer !== `${process.env.SHARE_DATA_APP}/`
  )
    res.status(400).json({
      message: "Host not authorized",
    });

  next();
};

module.exports = { checkRequest };
