import type { RequestHandler, Request, Response, NextFunction } from 'express'

export interface CustomParamsDictionary {
  [key: string]: any
}

export interface PaginationQuery {
  page?: string
  limit?: string
  search?: string
}

const catchAsync =
  (
    callback: RequestHandler<
      CustomParamsDictionary,
      any,
      any,
      PaginationQuery,
      Record<string, any>
    >
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(callback(req, res, next)).catch((err) => next(err))
  }

export default catchAsync
