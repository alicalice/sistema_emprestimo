"use client";

import { api } from "@/services/api";
import { Customer } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClienteTable() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

    async function handleAnalise(id: number) {}

    async function handleEdit(id: number) {}

    async function handleDelete(id: number) {
        if (confirm("Tem certeza que deseja apagar este cliente?")) {
            try {
                await api.deleteCustomer(id);
                setCustomers(customers.filter((c) => c.id !== id));
                alert("Cliente excluído com sucesso!");
            } catch (error) {
                console.error("Erro ou excluir cliente:", error);
                alert("Falha ao excluir cliente.");
            }
            return;
        }
    }

    useEffect(() => {
        async function fetchCustomers() {
            const data = await api.getCustomers();

            setCustomers(data);
        }

        fetchCustomers();
    }, []);

    return (
        <main className="min-h-screen bg-[#EAF6FF] px-6 py-12 text-[#29485A]">
            <div className="mx-auto max-w-4xl space-y-6">

                <h1 className="text-3xl font-bold">
                    Clientes Cadastrados
                </h1>

                <Link
                    href="/clientes/novo"
                    className="inline-block rounded-lg border border-[#C5E3F3] bg-[#DDF2FC] px-4 py-2 font-medium text-[#29485A] shadow-sm transition-colors duration-200 hover:bg-[#CBEAF8]"
                >
                    Novo Cliente
                </Link>

                <div className="overflow-x-auto rounded-xl border border-[#C5E3F3] bg-white shadow-sm">
                    <table className="w-full border-collapse">
                        <thead className="bg-[#F5FBFF]">
                            <tr className="border-b border-[#C5E3F3]">
                                <th className="px-4 py-3 text-left font-semibold">
                                    Nome
                                </th>

                                <th className="px-4 py-3 text-left font-semibold">
                                    CPF
                                </th>

                                <th className="px-4 py-3 text-left font-semibold">
                                    Renda
                                </th>

                                <th className="px-4 py-3 text-left font-semibold">
                                    UF
                                </th>

                                <th className="px-4 py-3 text-center font-semibold">
                                    Ações
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {customers.map((customer: any) => (
                                <tr
                                    key={customer.id}
                                    className="border-b border-[#E4F0F6] transition-colors hover:bg-[#F8FCFF]"
                                >
                                    <td className="px-4 py-3 font-semibold">
                                        {customer.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {customer.cpf}
                                    </td>

                                    <td className="px-4 py-3">
                                        R$ {customer.income}
                                    </td>

                                    <td className="px-4 py-3">
                                        {customer.location}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={`/analise?id=${customer.id}`}
                                                className="rounded-md border border-[#BFDDEC] bg-[#DDF2FC] px-3 py-1.5 text-sm font-semibold text-[#29485A] transition-colors duration-200 hover:bg-[#CBEAF8]"
                                            >
                                                Analisar
                                            </Link>

                                            <Link
                                                href={`/clientes/${customer.id}`}
                                                className="rounded-md border border-[#D8E6ED] bg-[#FAFCFD] px-3 py-1.5 text-sm font-semibold text-[#29485A] transition-colors duration-200 hover:bg-[#EAF6FF]"
                                            >
                                                Editar
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    handleDelete(customer.id)
                                                }
                                                className="rounded-md bg-[#F8DADA] px-3 py-1.5 text-sm font-semibold text-[#713C3C] transition-colors duration-200 hover:bg-[#F0C8C8]"
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
            </div>
        </main>
    );
}