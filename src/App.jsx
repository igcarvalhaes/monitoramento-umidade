import "./App.css";
import { Header } from "./components/Header";
import { CardMedicao } from "./components/CardMedicao";
import { HistoricoMedicao } from "./components/HistoricoMedicao";

const umidadeDados = {
  current: 58,
  optimal: "60-70%",
  history: [
    { value: 68, day: "Seg" }, // Just watered
    { value: 64, day: "Ter" }, // Slowly drying
    { value: 61, day: "Qua" }, // Still good
    { value: 58, day: "Qui" }, // Getting dry
    { value: 55, day: "Sex" }, // Too dry
    { value: 72, day: "Sab" }, // Watered again
    { value: 68, day: "Dom" }, // Stabilizing
  ],
};

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <CardMedicao />

          {/* Dados históricos */}

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Histórico de 7 dias de medição
            </h2>
            <div className="bg-white rounded-xl shadow-lg">
              <HistoricoMedicao data={umidadeDados.history} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
