export function HistoricoMedicao({ data }) {
  const getBarColor = (value) => {
    if (value < 60) return "bg-red-400";
    if (value > 70) return "bg-yellow-400";
    return "bg-green-400";
  };

  const maxValue = 100; // Set fixed max value for consistent scaling

  return (
    <div className="p-6">
      <div className="flex items-end justify-between h-64 mb-6">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-20">
            <div className="relative w-12 group">
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {item.value}%
              </div>
              {/* Bar */}
              <div
                className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${getBarColor(
                  item.value
                )}`}
                style={{
                  height: `${(item.value / maxValue) * 200}px`,
                  minHeight: "20px",
                }}
              />
            </div>
            <span className="mt-2 text-sm font-medium text-gray-600">
              {item.day}
            </span>
          </div>
        ))}
      </div>

      {/* Reference lines */}
      <div className="grid grid-cols-1 gap-8 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Baixo (&lt;60%)</span>
          <span>Ideal (60-70%)</span>
          <span>Alto (&gt;70%)</span>
        </div>
        <div className="flex justify-between">
          <div className="w-16 h-2 bg-red-400 rounded"></div>
          <div className="w-16 h-2 bg-green-400 rounded"></div>
          <div className="w-16 h-2 bg-yellow-400 rounded"></div>
        </div>
      </div>
    </div>
  );
}
