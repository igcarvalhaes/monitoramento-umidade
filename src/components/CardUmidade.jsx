import { Droplets } from "lucide-react";

export function CardUmidade({ current }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <div className="flex flex-col justify-evenly items-center h-full">
        <div className="flex items-center gap-3">
          <Droplets className="w-8 h-8 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-700">
            Índice Normalizado
          </h3>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-baseline">
            <span className="ml-5 text-9xl font-bold text-gray-800">
              {current}
            </span>
            <span className="text-4xl text-gray-500">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
