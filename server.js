import os from "os";

import cluster from "cluster";
import "dotenv/config";
import app from "./src/app.js";
const PORT = 3000;
const numCPUs = os.cpus().length;
const workers = 1; // Math.max(1, Math.floor(numCPUs - 2));

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} running`);
  console.log(`Forking ${workers} workers`);
  for (let i = 0; i < workers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on port ${PORT}`);
  });
}
