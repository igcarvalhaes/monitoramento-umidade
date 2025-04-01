import "./App.css";
import { Header } from "./components/Header";
import { CardUmidade } from "./components/CardUmidade";
import { CardBomba } from "./components/CardBomba";
import { HistoricoMedicao } from "./components/HistoricoMedicao";
import { GraficoUmidade } from "./components/GraficoUmidade";
import { GraficoTotalUmidade } from "./components/GraficoTotalUmidade";
import { StatusSolo } from "./components/StatusSolo";

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

        // Função para converter os campos de data e hora para um objeto Date
        const parseDate = (item) => {
          // Formato esperado: data "DD/MM/YYYY" e hora "HH:MM:SS"
          const [day, month, year] = item.data.split("/");
          // Monta uma string no formato ISO: "YYYY-MM-DDTHH:MM:SS"
          return new Date(`${year}-${month}-${day}T${item.hora}`);
        };

        const historico = rawData
          .sort((a, b) => parseDate(a) - parseDate(b))
          .map((item) => ({
            value: item.valor_sensor,
            percentage: Math.round(((4096 - item.valor_sensor) / 4096) * 100),
            date: item.data,
            time: item.hora,
            // Não usamos o timestamp para ordenação, mas ainda o guardamos se necessário
            timestamp: item.timestamp * 1000,
            status: item.status,
          }));

        setUmidadeDados({
          current: historico[historico.length - 1].value,
          currentPercentage: historico[historico.length - 1].percentage,
          optimal: "0-25%", // Faixa ideal conforme sua lógica
          fullHistory: historico,
          recentHistory: historico.slice(-6),
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

          {/* Nova seção para status do solo */}
          <div className="mt-4">
            <StatusSolo percentage={umidadeDados.currentPercentage} />
          </div>

          {/* Historico das últimas 3 medições de umidade */}

          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg">
              <HistoricoMedicao data={umidadeDados.fullHistory} />
            </div>
          </div>

          {/* <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg">
              <GraficoUmidade data={umidadeDados.fullHistory} />
            </div>
          </div> */}

          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg">
              <GraficoTotalUmidade data={umidadeDados.fullHistory} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
