import "./App.css";
import { Header } from "./components/Header";
import { CardMedicao } from "./components/CardMedicao";
import { HistoricoMedicao } from "./components/HistoricoMedicao";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

function App() {
  const [umidadeDados, setUmidadeDados] = useState({
    current: 0,
    optimal: "60-70%",
    history: [],
    statusBomba: "desligada", // Novo campo adicionado
  });

  useEffect(() => {
    const leiturasRef = ref(database, "/leituras");
    onValue(leiturasRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const rawData = Object.values(data);
        // Ordena por timestamp e pega os últimos registros
        const historico = rawData
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((item) => ({
            value: item.valor_sensor,
            percentage: Math.round((item.valor_sensor / 4096) * 100),
            date: item.data,
            time: item.hora.substring(0, 5), // Formata para HH:mm
            status: item.status,
            timestamp: item.timestamp,
          }));

        setUmidadeDados({
          current: historico[historico.length - 1].value,
          currentPercentage: historico[historico.length - 1].percentage,
          optimal: "60-70%",
          history: historico.slice(-9), // Pega últimos 10 registros
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
          <CardMedicao
            /* a medicao da umidade é de 0 a 4096, sendo 0 muito úmido e 4096 muito seco, ajustei para exibir em porcentagem em current*/
            currentPercentage={umidadeDados.currentPercentage}
            optimal={umidadeDados.optimal}
            bomba={umidadeDados.statusBomba} // Adicione esta linha
          />

          {/* Dados históricos */}

          <div className="mt-8">
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
