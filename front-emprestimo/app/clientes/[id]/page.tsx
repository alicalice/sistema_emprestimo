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
        <main className="max-w-3xl mx-auto p-6 space-y-6">

            <h1  className="title-primary">Editar Cliente</h1>
            <div className="card-container p-6">
                <form className="space-y-5" onSubmit={handleSubmit}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1 md:col-span-2">
                            <label className="form-label">Insira o nome:</label>
                            <input type="text"
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Insira o nome..."
                            required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="form-label">CPF: </label>
                            <input type="text" 
                            className="form-input"
                            value={CPF}
                            onChange={(e)=> setCPF(formatCPF(e.target.value))}
                            placeholder="Insira o CPF..."
                            maxLength={14}
                            required
                            />
                        </div>

                        <div className="space-y-1">

                            <label className="form-label">Idade: </label>
                            <input type="number"
                            className="form-input"
                            value={age}
                            onChange={(e)=> setAge(e.target.value)}
                            placeholder="Insira a idade..."
                            required
                            />

                        </div>

                        <div className="space-y-1">
                            <label className="form-label">Salário: </label>
                            <input type="number"
                            value={income}
                            className="form-input"
                            onChange={(e)=>setIncome(e.target.value)}
                            placeholder="Insira o valor do salário..."
                            required
                            />
                        </div>
                        
                        <div className="space-y-1">
                            <label className="form-label">UF: </label>
                            <select
                            className="form-input"
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

                        <div className="pt-4 md:col-span-2 flex md:justify-end">
                            <button className="btn-purple w-full md:w-auto" type="submit">Salvar Alterações</button>

                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}