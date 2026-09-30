interface LoanCardProps {
    
        type: string;
        interest_rate: number;
}

export function LoanCard({type,interest_rate}:LoanCardProps){
    return(
        <tr className="p-4 flex items-center justify-between">
            <div>
                <td className="block text-xs uppercase opacity-70">Modalidade</td>
                <td className="text-base font-bold">{type}</td>
            </div>

            <td className="text-right">
                <td className="block text-xs uppercase opacity-70">Taxa de Juros</td>
                <td className="text-base font-semibold">{interest_rate}% ao ano</td>
            </td>
        </tr>
    )
}