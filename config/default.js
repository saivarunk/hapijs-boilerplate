module.exports = {
  server: {
    port: process.env.PORT,
    hostname: process.env.APP_HOSTNAME,
  },
  JWTConfig: {
    secret: process.env.JWT_SECRET,
    exp: process.env.JWT_EXPIRY,
  },
  database: {
    uri: process.env.MONGO_URL,
  },
};
