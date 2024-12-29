const express = require("express");
const cluster = require("cluster");
const totalCpus = require("os").cpus().length;

const port = 3000;

if (cluster.isMaster) {
    for (let i = 0; i < totalCpus; i++) {
        cluster.fork();
    }
} else {
    const app = express();

    app.get("/", (req, res) => {
        res.send("Hello from worker " + cluster.worker.id);
    });

    app.listen(port, () => {
        console.log(`Worker ${cluster.worker.id} listening on port ${port}`);
    });
}
