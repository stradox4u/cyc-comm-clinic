import type { Request, Response, NextFunction } from 'express'
import { type Schema } from 'zod'

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      return res.status(401).json({
        success: false,
        errors: result.error,
      })
    }

    req.body = result.data
    next()
  }
}

export default validate
