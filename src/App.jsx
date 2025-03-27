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
        const historico = Object.values(data).map((item) => ({
          value: item.valor_sensor,
          percentage: Math.round((item.valor_sensor / 4096) * 100), // Já convertido para %
          date: item.data_hora.split(" ")[0], // Separa a data
          time: item.data_hora.split(" ")[1], // Separa a hora
          status: item.status,
        }));

        // Pega o último status da bomba
        const ultimoStatus = rawData[rawData.length - 1]?.status || "desligada";

        setUmidadeDados({
          current: historico[historico.length - 1].value,
          optimal: "60-70%",
          history: historico.slice(-9), // Últimas 10 medições
          statusBomba: rawData[rawData.length - 1]?.status || "desligada", // Campo crucial
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
            current={Math.round((umidadeDados.current / 4096) * 100)}
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
