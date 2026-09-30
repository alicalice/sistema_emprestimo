import { Customer, CustomerLoans } from "@/types";


const API_URL = "http://localhost:3000";

export const api = {
    async getCustomers(): Promise<Customer[]>{

        const response = await fetch(`${API_URL}/customers`,{ cache: 'no-store'});

        if(!response.ok){
            throw new Error('Erro ao buscar cliente')
        }
        return response.json();
    },

    async getCustomersbyid(id: string): Promise<Customer>{
        
        const response = await fetch(`${API_URL}/customers/${id}`, {cache: 'no-store'});

        if(!response.ok){

            throw new Error('Erro ao encontrar cliente.')
        }
        
        return response.json();
    },

    async  createCustomer(customer : Customer): Promise<Customer> {
        
        const response = await fetch(`${API_URL}/customers`,{
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(customer),
        });

        if(!response.ok){
            throw new Error ("Erro ao cadastrar cliente.")
        }
        return response.json();
    },
    async updateCustomer(id:string | number, customer: Customer):Promise<Customer>{
        const response = await fetch(`${API_URL}/customers/${id}`,{
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer),
        });
        if (!response.ok){
            throw new Error('Erro ao atualizar cliente.');
        }
        return response.json();
    },

    async deleteCustomer(id:number):Promise<void>{
        const response = await fetch(`${API_URL}/customers/${id}`,{
            method:'DELETE'
        });

        if(!response.ok){
            throw new Error("Erro ao deletar cadastro.")
        };
    },
    async getCustLoans(id: string):Promise<CustomerLoans>{
        const response = await fetch(`${API_URL}/customers/${id}/loans`,{
            cache: 'no-store'
        });

        if (!response.ok) throw new Error('Erro ao avaliar empréstimos.');
        return response.json();
    }
};

