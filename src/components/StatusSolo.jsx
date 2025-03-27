export function StatusSolo({ percentage }) {
  const getStatus = () => {
    if (percentage < 5) return "🔥 EMERGÊNCIA: Solo Desértico";
    if (percentage < 25) return "🌵 Solo Seco - Bomba Deveria Ligar";
    if (percentage < 75) return "🌱 Ideal para Hortaliças";
    return "💧 ALERTA: Solo Encharcado";
  };

  const getStatusStyle = () => {
    if (percentage < 5) return "bg-red-600 text-white animate-pulse";
    if (percentage < 25) return "bg-orange-100 text-orange-800";
    if (percentage < 75) return "bg-green-100 text-green-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <div className={`p-4 rounded-lg text-center ${getStatusStyle()}`}>
      <p className="font-medium">{getStatus()}</p>
    </div>
  );
}
