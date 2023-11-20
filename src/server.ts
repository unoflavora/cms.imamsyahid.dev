import express from "express";
import payload from "payload";
import "dotenv/config";

const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

const start = async () => {
  // Initialize Payload
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: async () => {
        console.info("PAYLOAD MIGRATIONS DIR", payload.db.migrationDir)
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });

    // Add your own express routes here

    const server = app.listen(3001, () => {
      console.log("listening on http://localhost:" + 3002);
    });

    process.on("SIGINT", () => {
      server.close();
      process.exit();
    });
  } catch (e) {
    console.log(e);
    process.exit();
  }
};

start();
