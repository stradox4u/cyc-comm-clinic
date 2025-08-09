import type { Request, Response, NextFunction } from 'express'
import type { ZodSchema } from 'zod'

type InputTarget = 'body' | 'query' | 'params'

const validate = (schema: ZodSchema, target: InputTarget = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target])

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.issues,
      })
    }

    req[target] = result.data
    next()
  }
}

export default validate
