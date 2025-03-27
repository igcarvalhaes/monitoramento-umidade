import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function GraficoUmidade({ data }) {
  // Formata os dados para o gráfico (9 últimas medições)
  const chartData = data.slice(-9).map((item) => ({
    time: item.time.substring(0, 5), // Formata para HH:mm
    percentage: item.percentage,
  }));

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Variação da Umidade ao Longo do Tempo
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
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

      <div className="mt-4 text-sm text-gray-500 text-center">
        Últimas 9 medições registradas (Horário do Servidor)
      </div>
    </div>
  );
}
