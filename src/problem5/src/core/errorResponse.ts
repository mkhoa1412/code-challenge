type ErrorResponseProps = {
  message?: string;
  code?: number;
  errors?: any;
};

const STATUS_CODE = {
  FORBIDDEN: 403,
  BAD_REQUEST: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const STATUS_MESSAGE = {
  FORBIDDEN: 'Forbidden',
  BAD_REQUEST: 'Bad Request',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
};

class ErrorResponse extends Error {
  code?: number;
  errors: any[];

  constructor({ code, message, errors }: ErrorResponseProps) {
    super(message);
    this.code = code;
    this.errors = errors;
  }
}

class BadRequestError extends ErrorResponse {
  constructor({
    code = STATUS_CODE.BAD_REQUEST,
    message = STATUS_MESSAGE.BAD_REQUEST,
    errors = null,
  }: ErrorResponseProps) {
    super({ code, message, errors });
  }
}

class InternalServerError extends ErrorResponse {
  constructor({
    code = STATUS_CODE.INTERNAL_SERVER_ERROR,
    message = STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
  }: ErrorResponseProps) {
    super({ code, message, errors: [] });
  }
}

export { ErrorResponse, BadRequestError, InternalServerError };
