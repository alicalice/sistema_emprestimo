import Link from "next/link";

export default function Header(){
    return(

        <header className="header-bar w-full py-4 px-6 mb-8">
            <nav className="max-w-4xl mx-auto flex items-center justify-center gap-4 md:gap-8">
                <Link href="/clientes" className="nav-link">Lista de Clientes</Link>
                <Link href='/clientes/novo' className="nav-link">Novo Cliente</Link>
                <Link href='/analise' className="nav-link">Análises de Empréstimos</Link>
            </nav>
        </header>
    );
}