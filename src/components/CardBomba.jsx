import { Zap } from "lucide-react";

export function CardBomba({ status }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <div className="flex flex-col justify-evenly items-center h-full">
        <div className="flex items-center gap-3">
          <Zap
            className={`w-12 h-12 ${
              status === "ligada" ? "text-green-500" : "text-red-500"
            }`}
          />
          <h3 className="text-xl font-semibold text-gray-700">
            Status da Bomba
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span
              className={`text-9xl font-bold ${
                status === "ligada" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status === "ligada" ? "ON" : "OFF"}
            </span>
          </div>
          <p className="text-sm text-center text-gray-500 mt-2">
            {status === "ligada"
              ? "Regando ativamente."
              : "Solo atualmente úmido."}
          </p>
        </div>
      </div>
    </div>
  );
}
