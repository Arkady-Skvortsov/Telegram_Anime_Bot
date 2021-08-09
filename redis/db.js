require("dotenv").config();
const redis = require("redis");

const client = redis.createClient({
  host: "redis",
  port: process.env.REDIS_PORT,
});

client.on("error", function (error) {
  console.log(error);
});

async function cache(key, content) {
  client.hmget(key, function (data) {
    if (data !== null) return data;
    else {
      client.hmset(key, content);
    }
  });
}

module.exports = { client, cache };
