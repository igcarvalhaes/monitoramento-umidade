import { Droplets } from "lucide-react";

export function CardUmidade({ current, optimal }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <div className="flex flex-col justify-evenly items-center h-full">
        <div className="flex items-center gap-3">
          <Droplets className="w-8 h-8 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-700">
            Umidade do Solo
          </h3>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-baseline">
            <span className="text-9xl font-bold text-gray-800">{current}</span>
            <span className="text-4xl text-gray-500">%</span>
          </div>
          <p className="text-sm text-center text-gray-500 mt-2">
            Faixa ideal: {optimal}
          </p>
        </div>
      </div>
    </div>
  );
}
