import Link from "next/link";

export default function Header(){
    return(

        <header className="mb-8 w-full border-b border-[#C5E3F3] bg-[#F5FBFF] px-6 py-4">
            <nav className="mx-auto flex max-w-4xl items-center justify-center gap-2 md:gap-4">

                <Link
                    href="./"
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-[#29485A] transition-colors duration-200 hover:bg-[#DDF2FC]"
                >
                    Home
                </Link>

                <Link
                    href="/clientes"
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-[#29485A] transition-colors duration-200 hover:bg-[#DDF2FC]"
                >
                    Lista de Clientes
                </Link>

                <Link
                    href='/clientes/novo'
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-[#29485A] transition-colors duration-200 hover:bg-[#DDF2FC]"
                >
                    Novo Cliente
                </Link>

                <Link
                    href='/analise'
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-[#29485A] transition-colors duration-200 hover:bg-[#DDF2FC]"
                >
                    Análises de Empréstimos
                </Link>
            </nav>
        </header>
    );
}