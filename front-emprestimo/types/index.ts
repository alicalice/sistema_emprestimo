export interface Customer {
    id?:number;
    name:string;
    cpf:string;
    age:number;
    income: number;
    location:string;
}

export interface Loan{
    type:string;
    interestRate:number;
}

export interface CustomerLoans{
    customer: string;
    loans:Loan[];
}