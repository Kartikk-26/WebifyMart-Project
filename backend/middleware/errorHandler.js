const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errMessage = err.message;
  
  if (err.name === 'ValidationError') {
    console.log('error', err.errors);
    console.log(Object.values(err.errors));
    const message = Object.values(err.errors).map((val) => val.message);
    statusCode = 400;
    errMessage = message;
  } else {
    console.log(err);
  }

  res.status(statusCode).json({
    message: errMessage,
  });
};

module.exports = errorHandler;

//requirement
