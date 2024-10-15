import { FastifyInstance, FastifyRequest } from "fastify";
import { User } from "../types"

declare module 'fastify' {
  interface FastifyRequest {
    user?: User
  }
}

export async function userPlugin(fastify: FastifyInstance) {
  
}