import Fastify from "fastify";
import { userPlugin } from "@/plugins/user";
import { authRoutes } from "@/routes/auth.route";
import { protectedRoutes } from "@/routes/protected.route";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import rateLimit from "@fastify/rate-limit";
import helmet from "@fastify/helmet";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

const app = Fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

/* Security */
app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
})

app.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
    },
  },
})

/* Documentation */
app.register(swagger, {
  openapi: {
    info: {
      title: 'Aprendendo Backend GPT',
      description: 'Documentação da API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
    },
    security: [{ Bearer: [] }],
    servers: [{ url: 'http://localhost:3000' }],
  }
})

app.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
})

/* Plugins */
app.register(userPlugin)

/* Routes */
app.after(() => {
  app.register(authRoutes)
  app.register(protectedRoutes)
})

/* Start Server */
app.listen({
  port: 3000,
}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server running on ${address}`)
})
