import Fastify from "fastify";
import { authRoutes } from "@/routes/auth.route"

const app = Fastify();

app.register(authRoutes);

app.listen({
  port: 3000,
}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server running on ${address}`)
})
