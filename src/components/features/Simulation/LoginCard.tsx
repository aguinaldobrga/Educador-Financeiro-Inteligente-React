import { ArrowRight, PiggyBank } from "lucide-react";
import { useState } from "react";

interface LoginCardProps {
  onLogin: (
    name: string,
    initialBalance: number,
    initialGoalAmount: number
  ) => void;
}

export function LoginCard({ onLogin }: LoginCardProps) {
  const [name, setName] = useState("");
  const [balanceInput, setBalanceInput] = useState("3200");
  const [goalInput, setGoalInput] = useState("15000");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Por favor, digite seu nome.");
      return;
    }

    onLogin(
      name,
      Number(balanceInput),
      Number(goalInput)
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="bg-card backdrop-blur-md p-8 rounded-2xl border border-border shadow-2xl space-y-6">

        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary rounded-xl text-primary-foreground shadow-lg">
            <PiggyBank size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold font-display text-foreground">
              Iniciar Jornada
            </h2>

            <p className="text-sm text-muted-foreground">
              Configure seu perfil de teste
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="name-input"
              className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"
            >
              Como quer ser chamado(a)?
            </label>

            <input
              id="name-input"
              value={name}
              maxLength={20}
              placeholder="Seu nome"
              onChange={(e) => {
                setName(e.target.value);

                if (error) setError("");
              }}
              className="w-full bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground outline-none transition-all"
            />

            {error && (
              <p className="text-red-500 text-xs mt-2">
                {error}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Saldo Atual (R$)
              </label>

              <input
                type="number"
                min={0}
                value={balanceInput}
                onChange={(e) =>
                  setBalanceInput(e.target.value)
                }
                className="w-full bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-foreground font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Meta de Reserva (R$)
              </label>

              <input
                type="number"
                min={1}
                value={goalInput}
                onChange={(e) =>
                  setGoalInput(e.target.value)
                }
                className="w-full bg-input border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-foreground font-mono outline-none"
              />
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:opacity-90 text-primary-foreground font-medium py-3 rounded-lg flex justify-center items-center gap-2 transition-all shadow-lg group cursor-pointer"
          >
            <span>Acessar Plataforma</span>

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

        </form>

        <div className="text-center pt-2">
          <span className="text-xs text-muted-foreground">
            Desenvolvido como projeto educacional para a DIO
          </span>
        </div>

      </div>
    </div>
  );
}