import { Droplets, Zap } from "lucide-react";

export function CardMedicao({ current, optimal, bomba }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-gray-700">
            Nível de umidade atual da planta
          </h3>
          <div>
            <h2 className="text-5xl font-bold">
              {current}
              <span className="text-2xl mx-1.5 text-gray-500 font-semibold">
                %
              </span>
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Valor desejado: {optimal}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Droplets className="w-8 h-8 text-blue-600" />
          <div className="flex items-center gap-2">
            <Zap
              className={`w-6 h-6 ${
                bomba === "ligada"
                  ? "text-green-500 animate-pulse"
                  : "text-red-500"
              }`}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">Bomba</span>
              <span
                className={`text-sm ${
                  bomba === "ligada" ? "text-green-600" : "text-red-600"
                }`}
              >
                {bomba === "ligada" ? "Ligada" : "Desligada"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
