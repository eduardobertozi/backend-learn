// plugins/user.ts
import { User } from '@/interfaces/user';
import { FastifyInstance, FastifyRequest } from 'fastify';


declare module 'fastify' {
  interface FastifyRequest {
    user?: Partial<User>;
  }
}

export async function userPlugin(fastify: FastifyInstance) {
  fastify.addHook('onRequest', async (request: FastifyRequest, reply) => {
    request.user = { id: '123', username: 'adminUser', role: 'admin' };
  });
}
