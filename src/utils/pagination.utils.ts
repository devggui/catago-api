export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  direction?: "asc" | "desc"
}

export interface PaginationResult<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export async function paginate<T, WhereInput>(
  model: {
    findMany: (args: {
      where?: WhereInput
      skip?: number
      take?: number
      orderBy?: any
    }) => Promise<T[]>
    count: (args: { where?: WhereInput }) => Promise<number>
  },
  params: PaginationParams,
  where?: WhereInput,
): Promise<PaginationResult<T>> {
  const page = Number(params.page || 1)
  const limit = Number(params.limit || 10)
  const orderBy = {
    [params.sortBy || "createdAt"]: params.direction || "asc",
  }
  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    model.findMany({
      where,
      skip,
      take: limit,
      orderBy,
    }),
    model.count({ where }),
  ])

  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  }
}
