export function HistoricoMedicao({ data }) {
  const dados = data.slice(-3).map((item) => ({
    date: item.date, // Adicione esta linha
    time: item.time.substring(0, 5),
    percentage: item.percentage,
    value: item.value,
    status: item.status, // Adicione esta linha
  }));

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Histórico de medições
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {dados.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  {item.date}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {item.percentage}%
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === "ligada"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-500">
                <span className="block">Horário:</span>
                <span className="font-medium">{item.time}</span>
              </div>
              <div className="text-gray-500">
                <span className="block">Valor bruto:</span>
                <span className="font-medium">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
