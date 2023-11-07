interface ErrorType {
  code: number,
  status: string,
  error: {
    name: string,
    details: string,
  },
  meta: {
    timestamp: string
  }
}

interface ErrorData {
  type: string | null,
  details: string | null,
}

export type { ErrorType, ErrorData };