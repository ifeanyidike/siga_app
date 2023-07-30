// import ErrorHandler from '@utils/errorHandler'
// import { createRouter } from 'next-connect'

// export default (err, req, res, next) => {
//   let error = { ...err }
//   error.statusCode = err.statusCode || 500
//   error.message = err.message || 'Internal Server Error'

//   if (err.name == 'ValidationError') {
//     const message = Object.values(err.errors).map((value) => value.message)
//     error = new ErrorHandler(message, 400)
//   }

//   if(err.code == 11000){
// const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
// error = new ErrorHandler(message, 400)

//   }

//   res.status(error.statusCode).json({
//     sucess: false,
//     error,
//     message: error.message,
//     stack: error.stack,
//   })
// }

// const router = createRouter()

// // export default router.handler({
// //   onError: (err, req, res) => {
// //     console.error(err.stack)
// //     res.status(err.statusCode || 500).end(err.message)
// //   },
// // })
