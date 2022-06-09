module.exports = {
  errorHandler: (err, req, res, next) => {
    if (err instanceof Error) {
      const { name, message } = err
      res.status(500).json({
        status: "err",
        message: `${name}: ${message}`,
      })
    } else {
      res.status(500).json({
        status: "error",
        message: err,
      })
    }
    next(err)
  },
}
