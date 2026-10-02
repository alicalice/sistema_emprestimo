'use client'

import { formatCPF } from "@/components/ClienteForm";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";


export default function EditarCliente({ params }: { params: Promise<{ id: string }> }){

    const {id} = use(params);

    const router = useRouter();

    const [name,setName] = useState('');
    const [CPF, setCPF] = useState('');
    const [age, setAge] = useState('');
    const [income, setIncome] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        async function loadCustomer() {
            const data = await api.getCustomersbyid(id);
            setName(data.name);
            setCPF(data.cpf);
            setAge(String(data.age));
            setIncome(String(data.income));
            setLocation(data.location)
        }
        loadCustomer();
    },[id]);

    async function handleSubmit(e:React.SubmitEvent) {
        e.preventDefault();

        await api.updateCustomer(id,{
            name,
            cpf:CPF,
            age:Number(age),
            income:Number(income),
            location
        });

        router.push('/clientes');
    }

    return (
        <main className="min-h-screen bg-[#EAF6FF] px-6 py-12 text-[#29485A]">

            <div className="mx-auto max-w-3xl space-y-6">

                <h1 className="text-3xl font-bold">
                    Editar Cliente
                </h1>

                <div className="rounded-2xl border border-[#C5E3F3] bg-white p-6 shadow-sm">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            <div className="space-y-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-[#29485A]">
                                    Insira o nome:
                                </label>

                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-[#C5E3F3] bg-[#F8FCFF] px-3 py-2.5 text-[#29485A] outline-none transition-colors duration-200 placeholder:text-[#8BA1AE] focus:border-[#9CCFE8] focus:bg-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Insira o nome..."
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-[#29485A]">
                                    CPF:
                                </label>

                                <input
                                    type="text" 
                                    className="w-full rounded-lg border border-[#C5E3F3] bg-[#F8FCFF] px-3 py-2.5 text-[#29485A] outline-none transition-colors duration-200 placeholder:text-[#8BA1AE] focus:border-[#9CCFE8] focus:bg-white"
                                    value={CPF}
                                    onChange={(e)=> setCPF(formatCPF(e.target.value))}
                                    placeholder="Insira o CPF..."
                                    maxLength={14}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-[#29485A]">
                                    Idade:
                                </label>

                                <input
                                    type="number"
                                    className="w-full rounded-lg border border-[#C5E3F3] bg-[#F8FCFF] px-3 py-2.5 text-[#29485A] outline-none transition-colors duration-200 placeholder:text-[#8BA1AE] focus:border-[#9CCFE8] focus:bg-white"
                                    value={age}
                                    onChange={(e)=> setAge(e.target.value)}
                                    placeholder="Insira a idade..."
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-[#29485A]">
                                    Salário:
                                </label>

                                <input
                                    type="number"
                                    value={income}
                                    className="w-full rounded-lg border border-[#C5E3F3] bg-[#F8FCFF] px-3 py-2.5 text-[#29485A] outline-none transition-colors duration-200 placeholder:text-[#8BA1AE] focus:border-[#9CCFE8] focus:bg-white"
                                    onChange={(e)=>setIncome(e.target.value)}
                                    placeholder="Insira o valor do salário..."
                                    required
                                />
                            </div>
                            
                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-[#29485A]">
                                    UF:
                                </label>

                                <select
                                    className="w-full rounded-lg border border-[#C5E3F3] bg-[#F8FCFF] px-3 py-2.5 text-[#29485A] outline-none transition-colors duration-200 focus:border-[#9CCFE8] focus:bg-white"
                                    value={location}
                                    onChange={(e)=>setLocation(e.target.value)}
                                >
                                    <option value="">Selecione um estado</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="BA">Bahia</option>
                                    <option value="PE">Pernambuco</option>
                                </select>
                            </div>

                            <div className="flex pt-4 md:col-span-2 md:justify-end">
                                <button
                                    className="w-full rounded-lg border border-[#BFDDEC] bg-[#DDF2FC] px-5 py-2.5 font-semibold text-[#29485A] shadow-sm transition-all duration-200 hover:bg-[#CBEAF8] hover:shadow-md md:w-auto"
                                    type="submit"
                                >
                                    Salvar Alterações
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}