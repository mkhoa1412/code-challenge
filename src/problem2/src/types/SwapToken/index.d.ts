export interface Currency {
	currency: string;
	price: number;
	date: string | Date;
}
export interface UserBalance {
	currency: string;
	amount: number;
}