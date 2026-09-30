'use client'

import { LoanCard } from "@/components/LoanCard";
import { api } from "@/services/api";
import { Customer } from "@/types";
import { useEffect, useState } from "react";

export default function Emprestimos(){

    const [customers,setCustomers] = useState<Customer[]>([]);

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [loansData,setLoansData] = useState<any>(null);

    useEffect(()=> {
        if(selectedId) {
            api.getCustLoans(selectedId).then(setLoansData);
        }
    },[selectedId]);

    useEffect(() => {
    if (!selectedId) {
        api.getCustomers().then(setCustomers);
    }
}, [selectedId]);

    if(!selectedId){
        return(
            <main className="max-w-4xl mx-auto p-6 space-y-4">
            <h1 className="title-primary">Análise de Crédito</h1>
            
            <div className="card-container p-6 space-y-4">
                <label className="form-label">Selecione um cliente para analisar:</label>
                
                <select 
                    className="form-input" 
                    onChange={(e) =>e.target.value && setSelectedId(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Escolha um cliente...</option>
                    {customers.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name} (CPF: {c.cpf})
                        </option>
                    ))}
                </select>
            </div>
        </main>
            
        );
    };
    
    if(!loansData){
        return(
            <main className="max-w-4xl mx-auto p-6 space-y-6">
                <h1 className="title-primary">Análise de Crédito</h1>
                <div className="card-container p-6 text-center text-sm font-semibold opacity-70 animate-pulse">
                    Analisando empréstimos disponíveis...
                </div>
            </main>
            
        );
    };

    return(
        <main className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="title-primary">Análise de Crédito</h1>
                    <button 
                    onClick={() =>{ 
                    setSelectedId(null);
                    setLoansData(null);
                }}
                    className="btn-cyan"
                    >
                    Trocar Cliente
                    </button>
                    
                </div>
               
            </div>

                <div className="excel-table-wrapper">

                    <table className="excel-table">
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                <span className="block label-cliente">Cliente Selecionado</span>
                                <span className="block nome-cliente">{loansData.customer}</span>
                        </th>
                            </tr>
                            <tr>
                                <th>Modalidade do Empréstimo</th>
                                <th>Taxa de Juros</th>
                            </tr>
                        </thead>
                    <tbody>
                        {loansData.loans?.map((loan: any) => (
                        <tr>
                            <td className="font-semibold">{loan.type}</td>
                            <td>{loan.interest_rate}% ao ano</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </main>
    )
}