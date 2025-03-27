import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Grafico7Dias({ data }) {
  // Filtra medições dos últimos 7 dias
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const filteredData = data.filter((item) => item.timestamp >= sevenDaysAgo);

  // Formata dados para o gráfico
  const chartData = filteredData.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    }),
    time: new Date(item.timestamp).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    percentage: item.percentage,
    timestamp: item.timestamp,
  }));

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Variação da Umidade nos Últimos 7 Dias
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip
              // Modifique o tooltip para mostrar ambos os valores:
              content={({ payload }) => (
                <div className="bg-white p-2 rounded-lg shadow-md border">
                  <p className="font-semibold">{payload?.[0]?.payload.date}</p>
                  <p className="text-sm">Hora: {payload?.[0]?.payload.time}</p>
                  <p className="text-blue-600">{payload?.[0]?.value}%</p>
                  <p className="text-xs text-gray-500">
                    Sensor: {4096 - payload?.[0]?.payload.value}
                  </p>
                </div>
              )}
            />
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
