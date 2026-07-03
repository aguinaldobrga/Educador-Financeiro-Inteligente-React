import PiggyBankImage from "@/assets/image/piggy-bank.png";

export function SimulationHero() {
  return (
    <div className="mb-8 text-center">
      <div className="relative flex items-center justify-center">
        <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
          Vamos planejar seu futuro
        </h1>

        <img
          src={PiggyBankImage}
          alt=""
          aria-hidden="true"
          className="hidden sm:block absolute left-1/2 ml-56 h-16 w-16 -translate-y-1"
        />
      </div>

      {/* Mobile */}
      <img
        src={PiggyBankImage}
        alt=""
        aria-hidden="true"
        className="mx-auto mt-4 h-16 w-16 sm:hidden"
      />

      <p className="text-muted-foreground mt-3 text-sm">
        Responda algumas questões para ter insights financeiros personalizados.
      </p>
    </div>
  );
}