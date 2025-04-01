import { Zap } from "lucide-react";

export function CardBomba({ lastIrrigation }) {
  // Nome da prop alterado para lastIrrigation
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <div className="flex flex-col justify-evenly items-center h-full">
        <div className="flex items-center gap-3">
          <Zap className="w-12 h-12 text-green-500" />
          <h3 className="text-xl font-semibold text-gray-700">
            Última Irrigação
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          {lastIrrigation ? (
            <>
              <p className="text-2xl font-semibold text-gray-700">
                {lastIrrigation}
              </p>
              <p className="text-sm text-center text-gray-500 mt-2">
                Esta foi a última vez que a bomba foi ligada.
              </p>
            </>
          ) : (
            <p className="text-sm text-center text-gray-500 mt-2">
              A bomba ainda não foi ligada.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
