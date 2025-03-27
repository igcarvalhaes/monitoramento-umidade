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
  // Pega e formata as últimas 50 medições
  const chartData = data.slice(-50).map((item) => ({
    time: item.time.substring(0, 5),
    percentage: item.percentage,
    value: item.value, // Mantemos o valor bruto para o tooltip
  }));

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Variação da Umidade (Últimas 50 Medições)
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
              interval={Math.floor(chartData.length / 10)} // Mostra 10 rótulos
            />
            <YAxis domain={[0, 100]} stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 rounded-lg shadow-md border">
                      <p className="font-medium">{payload[0].payload.time}</p>
                      <p className="text-blue-600">{payload[0].value}%</p>
                      <p className="text-xs text-gray-500">
                        Sensor: {payload[0].payload.value}
                      </p>
                    </div>
                  );
                }
                return null;
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
        Últimas 50 medições registradas (Horário do Servidor)
      </div>
    </div>
  );
}
