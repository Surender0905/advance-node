const redis = require("redis");
const publisher = redis.createClient();

publisher.on("error", (err) => {
    console.error("Redis error:", err);
});

publisher.on("connect", () => {
    console.log("Connected to Redis");
    // Publish a message
    publisher.publish("notifications", "Hello, Subscribers!", (err, reply) => {
        if (err) {
            console.error("Error publishing message:", err);
        } else {
            console.log("Message published, number of subscribers:", reply);
        }
        publisher.quit();
    });
});
