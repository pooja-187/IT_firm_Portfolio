import { createApp } from "./app.js";

const PORT = process.env.PORT || 5000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`[Portfolio API] Node.js server running on http://localhost:${PORT}`);
  console.log(`[Portfolio API] Bootstrap endpoint: http://localhost:${PORT}/api/content`);
});
