'use client'

import { LoanCard } from "@/components/LoanCard";
import { api } from "@/services/api";
import { Customer } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Emprestimos(){

    const [customers,setCustomers] = useState<Customer[]>([]);

    const searchParams = useSearchParams();
    const clienteId = searchParams.get("id");


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
            <main className="min-h-screen bg-[#EAF6FF] px-6 py-12 text-[#29485A]">
                <div className="mx-auto max-w-4xl space-y-6">

                    <h1 className="text-3xl font-bold">
                        Análise de Crédito
                    </h1>
            
                    <div className="rounded-2xl border border-[#C5E3F3] bg-white p-6 shadow-sm space-y-4">
                        <label className="block text-sm font-semibold text-[#29485A]">
                            Selecione um cliente para analisar:
                        </label>
                
                        <select 
                            className="w-full rounded-lg border border-[#C5E3F3] bg-[#F8FCFF] px-3 py-2.5 text-[#29485A] outline-none transition-colors duration-200 focus:border-[#9CCFE8] focus:bg-white"
                            onChange={(e) =>e.target.value && setSelectedId(e.target.value)}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Escolha um cliente...
                            </option>

                            {customers.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name} (CPF: {c.cpf})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </main>
        );
    };
    
    if(!loansData){
        return(
            <main className="min-h-screen bg-[#EAF6FF] px-6 py-12 text-[#29485A]">
                <div className="mx-auto max-w-4xl space-y-6">

                    <h1 className="text-3xl font-bold">
                        Análise de Crédito
                    </h1>

                    <div className="rounded-2xl border border-[#C5E3F3] bg-white p-6 text-center text-sm font-semibold text-[#587586] shadow-sm animate-pulse">
                        Analisando empréstimos disponíveis...
                    </div>
                </div>
            </main>
        );
    };

    return(
        <main className="min-h-screen bg-[#EAF6FF] px-6 py-12 text-[#29485A]">
            <div className="mx-auto max-w-4xl space-y-6">

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Análise de Crédito
                        </h1>

                        <p className="mt-1 text-sm text-[#587586]">
                            Consulte as opções de empréstimo disponíveis para o cliente.
                        </p>
                    </div>

                    <button 
                        onClick={() =>{ 
                            setSelectedId(null);
                            setLoansData(null);
                        }}
                        className="rounded-lg border border-[#C5E3F3] bg-white px-4 py-2 text-sm font-semibold text-[#29485A] shadow-sm transition-colors duration-200 hover:bg-[#DDF2FC]"
                    >
                        Trocar Cliente
                    </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#C5E3F3] bg-white shadow-sm">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th 
                                    colSpan={2}
                                    className="border-b border-[#C5E3F3] bg-[#F5FBFF] px-5 py-5 text-left"
                                >
                                    <span className="block text-xs font-semibold uppercase tracking-wide text-[#6A8492]">
                                        Cliente Selecionado
                                    </span>

                                    <span className="mt-1 block text-xl font-bold text-[#29485A]">
                                        {loansData.customer}
                                    </span>
                                </th>
                            </tr>

                            <tr className="border-b border-[#C5E3F3] bg-[#F8FCFF]">
                                <th className="px-5 py-4 text-left text-sm font-semibold text-[#29485A]">
                                    Modalidade do Empréstimo
                                </th>

                                <th className="px-5 py-4 text-right text-sm font-semibold text-[#29485A]">
                                    Taxa de Juros
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loansData.loans?.map((loan: any) => (
                                <tr
                                    key={loan.type}
                                    className="border-b border-[#E4F0F6] transition-colors duration-200 hover:bg-[#F8FCFF]"
                                >
                                    <td className="px-5 py-4 font-semibold text-[#29485A]">
                                        {loan.type}
                                    </td>

                                    <td className="px-5 py-4 text-right text-[#587586]">
                                        {loan.interest_rate}% ao ano
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            
            </div>
        </main>
    )
}