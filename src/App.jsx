import "./App.css";
import { Header } from "./components/Header";
import { CardUmidade } from "./components/CardUmidade";
import { CardBomba } from "./components/CardBomba";
import { HistoricoMedicao } from "./components/HistoricoMedicao";
import { GraficoUmidade } from "./components/GraficoUmidade";
import { Grafico7Dias } from "./components/Grafico7Dias";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

function App() {
  const [umidadeDados, setUmidadeDados] = useState({
    current: 0,
    optimal: "60-70%",
    fullHistory: [], // Todos os dados
    recentHistory: [], // Últimas 6 medições
    statusBomba: "desligada",
  });

  useEffect(() => {
    const leiturasRef = ref(database, "/leituras");
    onValue(leiturasRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const rawData = Object.values(data);
        const historico = rawData
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((item) => ({
            value: item.valor_sensor,
            percentage: Math.round((item.valor_sensor / 4096) * 100),
            date: item.data,
            time: item.hora,
            timestamp: item.timestamp * 1000, // Convertendo para milissegundos
            status: item.status,
          }));

        setUmidadeDados({
          current: historico[historico.length - 1].value,
          currentPercentage: historico[historico.length - 1].percentage,
          optimal: "60-70%",
          fullHistory: historico, // Mantém todos os dados
          recentHistory: historico.slice(-6), // Últimas 6
          statusBomba: historico[historico.length - 1].status,
        });
      }
    });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardUmidade
              current={umidadeDados.currentPercentage}
              optimal={umidadeDados.optimal}
            />
            <CardBomba status={umidadeDados.statusBomba} />
          </div>

          {/* Dados históricos */}

          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg">
              <HistoricoMedicao data={umidadeDados.recentHistory} />
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg">
              <GraficoUmidade data={umidadeDados.recentHistory} />
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg">
              <Grafico7Dias data={umidadeDados.fullHistory} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
