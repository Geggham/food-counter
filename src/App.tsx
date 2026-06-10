import { useMemo, useState } from "react";

const employees = [
  "Gor",
  "Ruzan",
  "Lara",
  "Sergo",
  "Gegham",
  "Armen",
  "Alex",
  "Koryun",
  "Agnes",
  "Mko",
];

function App() {
  const [delivery, setDelivery] = useState(0);

  const [orders, setOrders] = useState<Record<string, number>>(
    employees.reduce(
      (acc, name) => {
        acc[name] = 0;
        return acc;
      },
      {} as Record<string, number>,
    ),
  );

  const activePeople = useMemo(
    () => Object.values(orders).filter((v) => v > 0).length,
    [orders],
  );

  const deliveryPerPerson = activePeople ? delivery / activePeople : 0;

  const totalFood = Object.values(orders).reduce(
    (sum, value) => sum + value,
    0,
  );

  const grandTotal = totalFood + delivery;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-slate-800">
          Order Counter
        </h1>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold">Orders</h2>

            <div className="space-y-4">
              {employees.map((person) => (
                <div
                  key={person}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                >
                  <span className="font-medium text-slate-700">{person}</span>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={orders[person] || ""}
                      onChange={(e) =>
                        setOrders((prev) => ({
                          ...prev,
                          [person]: Number(e.target.value) || 0,
                        }))
                      }
                      className="w-40 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                      placeholder="0"
                    />

                    <span className="font-semibold text-slate-500">AMD</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <label className="mb-2 block font-semibold">Delivery</label>

              <input
                type="number"
                min={0}
                value={delivery || ""}
                onChange={(e) => setDelivery(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
                placeholder="Delivery cost"
              />

              <div className="mt-3 text-sm text-slate-500">
                Delivery is divided among <strong>{activePeople}</strong> people
                with active orders.
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-semibold">Summary</h2>

            <div className="space-y-3">
              {employees
                .filter((person) => orders[person] > 0)
                .map((person) => {
                  const food = orders[person];
                  const total = food + deliveryPerPerson;

                  return (
                    <div
                      key={person}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">{person}</span>

                        <span className="text-lg font-bold text-green-600">
                          {Math.round(total)} AMD
                        </span>
                      </div>

                      <div className="mt-2 text-sm text-slate-500">
                        Food: {food} AMD
                      </div>

                      <div className="text-sm text-slate-500">
                        Delivery: {Math.round(deliveryPerPerson)} AMD
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="mt-8 rounded-2xl bg-blue-50 p-6">
              <div className="mb-3 flex justify-between">
                <span>Total Food</span>
                <span>{totalFood} AMD</span>
              </div>

              <div className="mb-3 flex justify-between">
                <span>Delivery</span>
                <span>{delivery} AMD</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Grand Total</span>
                  <span>{grandTotal} AMD</span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-green-50 p-5">
              <h3 className="mb-2 font-semibold">Delivery Per Person</h3>

              <div className="text-2xl font-bold text-green-700">
                {Math.round(deliveryPerPerson)} AMD
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
