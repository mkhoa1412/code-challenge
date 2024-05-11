type SuccessResponseProps = {
  message?: string;
  code?: number;
  metadata?: any;
};

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
};

const STATUS_MESSAGE = {
  OK: 'Success',
  CREATED: 'Created successfully',
};

class SuccessResponse {
  message?: string;
  code?: number;
  metadata?: any;

  constructor({ message, code, metadata }: SuccessResponseProps) {
    this.message = message;
    this.code = code;
    this.metadata = metadata;
  }

  send(res: any) {
    return res.status(this.code).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({
    message = STATUS_MESSAGE.OK,
    code = STATUS_CODE.OK,
    metadata,
  }: SuccessResponseProps) {
    super({ message, code, metadata });
  }
}

class Created extends SuccessResponse {
  constructor({
    message = STATUS_MESSAGE.CREATED,
    code = STATUS_CODE.CREATED,
    metadata,
  }: SuccessResponseProps) {
    super({ message, code, metadata });
  }
}

export { OK, Created };
