import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // Create or update the demo user
  const user = await createUser({
    username: "demo",
    password: "password123",
  });

  // Create tasks owned by that user (no description column in schema)
  const tasks = [
    { title: "Buy groceries" },
    { title: "Read 30 minutes" },
    { title: "Workout" },
  ];

  for (const t of tasks) {
    await createTask(t.title, false, user.id);
  }
}
