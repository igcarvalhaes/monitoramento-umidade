import "./App.css";
import { Header } from "./components/Header";
import { CardMedicao } from "./components/CardMedicao";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-8">
          <CardMedicao />
        </main>
      </div>
    </>
  );
}

export default App;
