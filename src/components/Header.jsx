import { Activity } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-1.5 text-center md:flex-row md:justify-between md:text-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Medidor de Umidade da Planta
            </h1>
            {/* <p className="mt-1 font-extralight text-gray-600">
              Monitoramento de umidade em tempo real
            </p> */}
          </div>
          <Activity className="text-blue-600 w-8 h-8 mt-2 md:mt-0" />
        </div>
      </div>
    </header>
  );
}
