import { Droplets } from "lucide-react";

export function CardMedicao() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex justify-between mb-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-gray-700">
            Nível de Umidade da Planta
          </h3>
          <div>
            <h2 className="text-5xl font-bold">
              58
              <span className="text-2xl mx-1.5 text-gray-500 font-semibold">
                %
              </span>
            </h2>
            <p className="text-sm text-gray-500 mt-2">Valor desejado: 60-70%</p>
          </div>
        </div>
        <Droplets className="w-8 h-8 text-red-700" />
      </div>
    </div>
  );
}
