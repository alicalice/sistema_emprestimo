import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#EAF6FF] px-6 py-12 text-[#29485A]">
            <div className="mx-auto max-w-5xl text-center">
                <h1 className="text-4xl font-bold">
                    Sistema de Empréstimos
                </h1>

                <p className="mx-auto mt-3 max-w-xl text-[#587586]">
                    Bem-vindo(a)! O que você gostaria de fazer?
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    <Link
                        href="/clientes"
                        className="rounded-2xl border border-[#C5E3F3] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#F5FBFF] hover:shadow-md"
                    >
                        <h2 className="text-xl font-semibold">
                            Clientes
                        </h2>

                        <p className="mt-2 text-sm text-[#6A8492]">
                            Ver e gerenciar a lista de cadastrados.
                        </p>
                    </Link>

                    <Link
                        href="/clientes/novo"
                        className="rounded-2xl border border-[#C5E3F3] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#F5FBFF] hover:shadow-md"
                    >
                        <h2 className="text-xl font-semibold">
                            Novo Cliente
                        </h2>

                        <p className="mt-2 text-sm text-[#6A8492]">
                            Cadastrar uma nova pessoa no sistema.
                        </p>
                    </Link>

                    <Link
                        href="/analise"
                        className="rounded-2xl border border-[#C5E3F3] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#F5FBFF] hover:shadow-md"
                    >
                        <h2 className="text-xl font-semibold">
                            Análise
                        </h2>

                        <p className="mt-2 text-sm text-[#6A8492]">
                            Consultar empréstimos disponíveis.
                        </p>
                    </Link>
                </div>
            </div>
        </main>
    );
}