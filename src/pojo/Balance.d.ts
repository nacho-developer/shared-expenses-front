export interface BalanceResponse {
    [name: string]: number;
}

export interface Transaction {
    from: string;
    to: string;
    amount: number;
}