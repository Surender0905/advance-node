const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => {
    console.error("Redis error:", err);
});

client.on("connect", () => {
    console.log("Connected to Redis");
    // Process tasks from the queue
    client.brPop("tasks", 0, (err, reply) => {
        if (err) {
            console.error("Error processing task:", err);
        } else {
            console.log("Processing task:", reply[1]);
        }
        client.quit();
    });
});
