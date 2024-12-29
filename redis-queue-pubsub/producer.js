const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => {
    console.error("Redis error:", err);
});

client.on("connect", () => {
    console.log("Connected to Redis");
    // Add a task to the queue
    client.lPush("tasks", "Task 1", (err, reply) => {
        if (err) {
            console.error("Error adding task:", err);
        } else {
            console.log("Task added, length of queue:", reply);
        }
        client.quit();
    });
});
