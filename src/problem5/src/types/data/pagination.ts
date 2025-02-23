export type PaginationData<D = any> = {
	items: D[];
	total: number;
	page: number;
	limit: number;
};

export type PaginationInputData<D = any> = {
	page: number;
	limit: number;
	sortColumn?: D;
	sortType?: "ASC" | "DESC";
	keyword?: string;
};
