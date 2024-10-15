import { FastifyReply } from "fastify";

export class ResponseHandler {
  static success(reply: FastifyReply, message: string = 'success', data: any) {
    reply.send({ success: true, message, data })
  }

  static error(reply: FastifyReply, message: string = 'error', statusCode: number = 500) {
    reply.status(statusCode).send({ sucess: false, message })
  }
}