// plugins/user.ts
import { FastifyInstance, FastifyRequest } from 'fastify';
import { User } from '../types';

declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}

export async function userPlugin(fastify: FastifyInstance) {
  fastify.addHook('onRequest', async (request: FastifyRequest, reply) => {
    request.user = { id: '123', username: 'adminUser', role: 'admin' };
  });
}
