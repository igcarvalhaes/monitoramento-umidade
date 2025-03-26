import { Activity } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Medidor de Umidade da Planta
            </h1>
            <p className="mt-1  text-gray-600">
              Monitoramento de umidade em tempo real
            </p>
          </div>
          <Activity className="text-blue-600 w-8 h-8" />
        </div>
      </div>
    </header>
  );
}
