// import bcrypt from "bcryptjs";

// const password = "123456";

// const hash1 = await bcrypt.hash(password, 10);
// console.log(hash1);

// // const hash2 = await bcrypt.hash(password, 10);
// // console.log(hash2);

// const ok = await bcrypt.compare(password, hash1);
// const fail = await bcrypt.compare("1234", hash1);

// console.log(ok);
// console.log(fail);

// ---

// import dotenv from "dotenv";
// dotenv.config();

// import { config } from "dotenv";
// config({ path: ".env" });

// import jwt from "jsonwebtoken";

// // const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, {
// //   expiresIn: process.env.JWT_EXPIRES_IN,
// // });

// // console.log(token);

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YmIwZjQxMDk3OTk5MjEwYzhlMDY0ZiIsImVtYWlsIjoidGVzdEBleGFtcGxlLm5ldCIsImlhdCI6MTc3Mzk1MDMwOCwiZXhwIjoxNzczOTUzOTA4fQ.GEn7AQZ7yHJB0FDlGdVV2VXGgXYwmCGhSvqYcFet6zI";

// try {
//   const isVerify = jwt.verify(token, process.env.JWT_SECRET);
//   console.log(isVerify);

//   // const decoded = jwt.decode(token);
//   // console.log(decoded);
// } catch (error) {
//   console.log(error);
// }

// ---

// fetch("http://localhost:3000/products")
//   .then((res) => {
//     console.log('OK!!!', res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
