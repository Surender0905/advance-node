const redis = require("redis");
const subscriber = redis.createClient();

subscriber.on("error", (err) => {
    console.error("Redis error:", err);
});

subscriber.on("connect", () => {
    console.log("Connected to Redis");
    // Subscribe to a channel
    subscriber.subscribe("notifications");
});

subscriber.on("message", (channel, message) => {
    console.log(`Received message from ${channel}: ${message}`);
});
