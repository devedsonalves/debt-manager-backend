import 'dotenv/config';

import Fastify from 'fastify';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';

const app = Fastify();                  
const db = drizzle(process.env.DB_FILE_NAME!);

app.get('/users', async (request, reply) => {
  const users = await db.select().from(usersTable);
  return reply.status(200).send(users);
});

app.post('/users', async (request, reply) => {
  const { name, age, email } = request.body as { name: string; age: number; email: string };
  const user = await db.insert(usersTable).values({ name, age, email });
  return reply.status(201).send(user);
});

app.put('/users/:id', async (request, reply) => {
  const { id } = request.params as { id: number };
  const { name, age, email } = request.body as { name: string; age: number; email: string };
  const user = await db.update(usersTable).set({ name, age, email }).where(eq(usersTable.id, id));
  return reply.status(200).send(user);
});

app.delete('/users/:id', async (request, reply) => {
  const { id } = request.params as { id: number };
  const user = await db.delete(usersTable).where(eq(usersTable.id, id));
  return reply.status(200).send(user);
});

const start = async () => {
  try {
    await app.listen({ port: 3333});
    console.log('Servidor rodando em http://localhost:3333');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start(); 