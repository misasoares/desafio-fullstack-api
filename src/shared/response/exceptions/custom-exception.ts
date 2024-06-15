import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

/**
 * Documentação sobre este padrão de exceção: https://docs.nestjs.com/exception-filters#catch-everything
 *
 * @export
 * @class CustomExceptionFilter
 * @implements {ExceptionFilter}
 */

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const language = request.headers['accept-language'] || 'pt-BR';

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = defineMessage(exception, language);

    response.status(statusCode).json({
      code: statusCode,
      success: false,
      message,
      invalidFields: exception.response?.invalidFields,
      stack: exception.stack,
    });
  }
}

function defineMessage(exception: any, language: string): string {
  let message = '';

  if (exception instanceof PrismaClientKnownRequestError) {
    switch (language) {
      case 'en-US':
        message = `Internal error. Try again later. - Error: ${exception.code}`;
        break;
      case 'pt-BR':
      default:
        message = `Erro interno. Tente novamente mais tarde. - Error: ${exception.code}`;
        break;
    }
    return message;
  }

  switch (language) {
    case 'en-US':
      message = exception.message || 'Internal server error';
      break;
    case 'pt-BR':
    default:
      message = exception.message || 'Erro interno do servidor';
  }

  return message;
}
