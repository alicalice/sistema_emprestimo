interface LoanCardProps {
    type: string;
    interest_rate: number;
}

export function LoanCard({ type, interest_rate }: LoanCardProps) {
    return (
        <tr className="flex items-center justify-between rounded-xl border border-[#C5E3F3] bg-white px-5 py-4 shadow-sm transition-colors duration-200 hover:bg-[#F8FCFF]">
            <div>
                <td className="block text-xs font-medium uppercase tracking-wide text-[#6A8492]">
                    Modalidade
                </td>

                <td className="block text-base font-bold text-[#29485A]">
                    {type}
                </td>
            </div>

            <td className="text-right">
                <td className="block text-xs font-medium uppercase tracking-wide text-[#6A8492]">
                    Taxa de Juros
                </td>

                <td className="block text-base font-semibold text-[#29485A]">
                    {interest_rate}% ao ano
                </td>
            </td>
        </tr>
    );
}