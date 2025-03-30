import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function GraficoTotalUmidade({ data }) {
  // Formatação dos dados sem limite de medições
  const chartData = data.map((item) => ({
    time: item.time.substring(0, 5),
    percentage: item.percentage,
    value: item.value,
    date: item.date, // Mantemos a data completa para o tooltip
  }));

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Variação da Umidade
      </h3>

      <div className="h-96">
        {" "}
        {/* Aumentamos a altura para melhor visualização */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
              interval={Math.floor(chartData.length / 15)} // Ajuste dinâmico
            />
            <YAxis
              domain={[0, 100]}
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
                      <p className="font-semibold text-gray-800">
                        {payload[0].payload.date}
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-blue-600">
                          <span className="block text-xs">Umidade</span>
                          <span className="text-lg font-bold">
                            {payload[0].payload.percentage}%
                          </span>
                        </div>
                        <div className="text-gray-500">
                          <span className="block text-xs">Valor Bruto</span>
                          <span className="text-lg font-bold">
                            {payload[0].payload.value}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Horário: {payload[0].payload.time}
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
              dot={false}
              activeDot={{
                r: 6,
                fill: "#3b82f6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Histórico completo de medições registradas
      </div>
    </div>
  );
}
