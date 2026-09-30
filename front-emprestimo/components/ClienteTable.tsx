'use client'

import { api } from "@/services/api";
import { Customer } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function ClienteTable(){
    const [customers,setCustomers] = useState<Customer[]>([]);

    const [selectedCustomerId,setSelectedCustomerId] = useState<number | null>(null);

    
    async function handleAnalise(id:number) {
        
    }
    async function handleEdit(id:number) {
        
    }

    async function handleDelete(id: number) {
        if (confirm('Tem certeza que deseja apagar este cliente?')) {
            try{
            await api.deleteCustomer(id);
            setCustomers(customers.filter(c => c.id !== id));
            alert('Cliente excluído com sucesso!');
            }catch(error){
                console.error("Erro ou excluir cliente:", error)
                alert('Falha ao excluir cliente.')
            }
            return;
        }
    };



    useEffect(()=>{
        async function fetchCustomers() {
            const data = await api.getCustomers();

            setCustomers(data);
        }
        fetchCustomers()
    },[])


    return(
        <main className="max-w-4xl mx-auto p-6 space-y-6">

            <h1 className="text-2xl font-bold">Clientes Cadastrados</h1>
            <Link href="/clientes/novo" className="btn-purple y-8">
            Novo Cliente
            </Link>


            <div className="overflow-x-auto">
                <table className="excel-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Renda</th>
                            <th>UF</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                <tbody>{customers.map((customer:any) => (
                    <tr key={customer.id}>
                        <td className="font-semibold">{customer.name}</td>
                        <td>{customer.cpf}</td>
                        <td>R$ {customer.income}</td>
                        <td>{customer.location}</td>
                        <td>
                            <div className="flex items-center justify-center gap-2">
                                <Link href={`/analise?id=${customer.id}`} className="btn-purple">Analisar</Link>
                                <Link href={`/clientes/${customer.id}`} className="btn-cyan">
                                Editar
                                </Link>
                                <button
                                onClick={() => handleDelete(customer.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-semibold px-2"
                                >
                                Apagar
                                </button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </main>
    )
}