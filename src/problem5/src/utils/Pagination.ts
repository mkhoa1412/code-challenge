import { Repository, FindManyOptions } from "typeorm";

import { ObjectLiteral } from "typeorm";

export class Pagination<T extends ObjectLiteral> {
  private repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async paginate(options: { page?: number; limit?: number; filters?: FindManyOptions<T> }) {
    let { page = 1, limit = 10, filters = {} } = options;
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const [data, totalCount] = await this.repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      ...filters,
    });

    return {
      data,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }
}
