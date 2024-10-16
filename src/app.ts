import Fastify from "fastify";
import { userPlugin } from "@/plugins/user";
import { authRoutes } from "@/routes/auth.route";
import { protectedRoutes } from "@/routes/protected.route";

const app = Fastify()

app.register(userPlugin)

app.register(authRoutes)
app.register(protectedRoutes)

app.listen({
  port: 3000,
}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server running on ${address}`)
})
