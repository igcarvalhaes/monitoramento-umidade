import "./App.css";
import { Header } from "./components/Header";
import { CardUmidade } from "./components/CardUmidade";
import { CardBomba } from "./components/CardBomba";
import { HistoricoMedicao } from "./components/HistoricoMedicao";
import { GraficoTotalUmidade } from "./components/GraficoTotalUmidade";
import { StatusSolo } from "./components/StatusSolo";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";
import { Footer } from "./components/Footer";

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

        // Função para converter "data" e "hora" em um objeto Date ajustado para o fuso de Brasília
        const parseDate = (item) => {
          const [day, month, year] = item.data.split("/");
          let dateObj = new Date(`${year}-${month}-${day}T${item.hora}`);
          // Subtrai 3 horas para ajustar para o horário de Brasília
          dateObj.setHours(dateObj.getHours() - 3);
          return dateObj;
        };

        // Ordena os dados pelo objeto Date ajustado e mapeia para o formato desejado
        const historico = rawData
          .sort((a, b) => parseDate(a) - parseDate(b))
          .map((item) => {
            const adjustedDate = parseDate(item);
            return {
              value: item.valor_sensor,
              percentage: Math.round(((4095 - item.valor_sensor) / 4095) * 100),
              date: adjustedDate.toLocaleDateString("pt-BR"), // Ex.: "28/03/2025"
              time: adjustedDate.toLocaleTimeString("pt-BR"), // Ex.: "14:10:00"
              timestamp: adjustedDate.getTime(),
              status: item.status,
            };
          });

        // Busca o último registro com status "irrigando" (ou null, se não houver)
        let lastOn = null;
        for (let i = historico.length - 1; i >= 0; i--) {
          if (historico[i].status === "irrigando") {
            lastOn = `${historico[i].date} às ${historico[i].time}`;
            break;
          }
        }

        setUmidadeDados({
          current: historico[historico.length - 1].value,
          currentPercentage: historico[historico.length - 1].percentage,
          optimal: "0-25%",
          fullHistory: historico,
          recentHistory: historico.slice(-6),
          statusBomba: historico[historico.length - 1].status,
          lastIrrigation: lastOn,
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

            <CardBomba lastIrrigation={umidadeDados.lastIrrigation} />
          </div>

          {/* Nova seção para status do solo 
          <div className="mt-4">
            <StatusSolo percentage={umidadeDados.currentPercentage} />
          </div>
          */}

          {/* Historico das últimas 3 medições de umidade */}

          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg">
              <HistoricoMedicao data={umidadeDados.fullHistory} />
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg">
              <GraficoTotalUmidade data={umidadeDados.fullHistory} />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
