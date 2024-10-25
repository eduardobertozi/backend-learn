import { ResponseHandler } from "@/util/response-handler";
import { FastifyReply, FastifyRequest } from "fastify";
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'

export const errorHandler = (error: any, request: FastifyRequest, reply: FastifyReply) => {
  console.error(error)

  if (hasZodFastifySchemaValidationErrors(error)) {
    return ResponseHandler.error(reply, 'Falha de validação', 400, error.validation.map(error => {
      return { 
        field: error.params.issue.path[0], 
        message: error.message 
      }
    }))
  }

  return ResponseHandler.error(reply, 'Internal Server Error', 500)
}