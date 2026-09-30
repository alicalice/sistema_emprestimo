import Link from "next/link";

export default function Home(){
  return(
    <main style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div>
            <h1>Sistema de Empréstimos</h1>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
                <p>Bem vindo(a) a página principal! O que gostaria de fazer?</p>

            </div>
            <div>
                <Link href="/clientes">
                    <h3>Clientes</h3>
                    <p>Ver e gerenciar a lista de cadastrados</p>
                </Link>

                <Link href="/clientes/novo">
                    <h3> Novo Cliente</h3>
                    <p>Cadastrar uma nova pessoa no sistema</p>
                </Link>

                <Link href="/analise">
                    <h3>Análise</h3>
                    <p>Consultar empréstimos disponíveis</p>
                </Link>
            </div>
        </div>
    </main>
  )
}