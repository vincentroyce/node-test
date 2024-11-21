function handlerError (error,request,response, next) {
  switch (error.name) {
    case "UnauthorizedError":
      return response.status(401).json({
        err_msg: "unauthorized user"
      })
    case "ValidationError":
      return response.status(401).json({
        err_msg: error
      })
    default:
      return response.status(500).json({
        err_msg: error
      })
  }
}

export default handlerError