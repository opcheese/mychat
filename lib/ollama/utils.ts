import { EmptyResponseBodyError } from '@ai-sdk/provider'
import {
  extractResponseHeaders,
  ParseResult,
  ResponseHandler,
  safeParseJSON,
} from '@ai-sdk/provider-utils'
import { ZodSchema } from 'zod'

export const createJsonStreamResponseHandler =
  <T>(
    chunkSchema: ZodSchema<T>,
  ): ResponseHandler<ReadableStream<ParseResult<T>>> =>
  async ({ response }: { response: Response }) => {
    const responseHeaders = extractResponseHeaders(response)

    if (response.body === null) {
      throw new EmptyResponseBodyError({})
    }

    return {
      responseHeaders,
      value: response.body.pipeThrough(new TextDecoderStream()).pipeThrough(
        new TransformStream<string, ParseResult<T>>({
          transform(data, controller) {
            data.split('\n').forEach(line => { 
                if (line.length > 0) {
                    controller.enqueue(
                    safeParseJSON({
                        schema: chunkSchema,
                        text: line,
                    }),
                    )
                }
            }
        )}
        }),
      ),
    }
  }

export function removeUndefined(object: object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, v]) => v !== undefined),
  )
}