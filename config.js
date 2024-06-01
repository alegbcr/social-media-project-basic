require("dotenv").config();

module.exports = {
  api: {
    port: process.env.PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  jwt: {
    secret: process.env.SECRET || "no-secret-key",
  },
  mysql: {
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_ROOT_PASSWORD || "admin123",
    database: process.env.MYSQL_DATABASE || "garden_social_media",
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || "3307",
  },
  mysqlService: {
    host: process.env.MYSQL_SERVICE_HOST || "localhost",
    port: process.env.MYSQL_SERVICE_PORT || 3001,
  },
};
