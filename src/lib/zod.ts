import { z } from "zod"
export interface ZodErrorMessageType {
  index: number
  path: string
  message: string
}
export const handleZodError = (error: unknown): Array<ZodErrorMessageType> => {
  let zodError: Array<ZodErrorMessageType> = new Array<ZodErrorMessageType>()

  if (error instanceof z.ZodError) {
    zodError = error.issues.map((issue, index) => ({
      index: index,
      path: issue.path.toString(),
      message: issue.message,
    }))
  }

  return zodError
}
