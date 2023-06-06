// module.exports = {
//   // Akses token expired dalam 2 hari
//   jwtAccessSecret: "expressify-secret-key",
//   jwtAccessExpiration: 86400 * 2,
// };

// Akses token expired dalam 2 hari
const jwtAccessSecret = "expressify-secret-key";
const jwtAccessExpiration = 86400 * 2;
// const jwtAccessExpiration = 2;

export { jwtAccessSecret, jwtAccessExpiration };
