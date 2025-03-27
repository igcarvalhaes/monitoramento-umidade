export function HistoricoMedicao({ data }) {
  // Função para formatar a hora (remove segundos)
  const formatTime = (time) => {
    return time.substring(0, 5);
  };

  // Função para estilo do status
  const getStatusStyle = (status) => {
    return status === "ligada"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Últimas 10 medições registradas
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
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
                className={`${getStatusStyle(
                  item.status
                )} px-2 py-1 rounded-full text-xs font-medium`}
              >
                {item.status}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-500">
                <span className="block">Horário:</span>
                <span className="font-medium">{formatTime(item.time)}</span>
              </div>
              <div className="text-gray-500">
                <span className="block">Sensor:</span>
                <span className="font-medium">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex gap-4 justify-end text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 rounded-full" />
            <span className="text-gray-600">Bomba ligada</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-100 rounded-full" />
            <span className="text-gray-600">Bomba desligada</span>
          </div>
        </div>
      </div>
    </div>
  );
}
