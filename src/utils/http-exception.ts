import { HTTP_STATUS } from './http-response-statuses'

export class HttpException extends Error {
  public status: number
  public message: string

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

type ErrorParams = {
  status?: number
  message: string
}

export const unProcessableEntityError = ({
  status = HTTP_STATUS.UNPROCESSABLE_ENTITY,
  message
}: ErrorParams) => new HttpException(status, message)

export const badRequestError = ({
  status = HTTP_STATUS.BAD_REQUEST,
  message
}: ErrorParams) => new HttpException(status, message)

export const notFoundError = ({
  status = HTTP_STATUS.NOT_FOUND,
  message
}: ErrorParams) => new HttpException(status, message)
