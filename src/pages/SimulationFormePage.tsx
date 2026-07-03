import { SimulationForm } from '@/components/features/Simulation/Form';
import { SimulationHero } from '@/components/features/Simulation/Hero';
import { AuthView } from "@/components/features/Simulation/AuthView";

export function SimulationFormPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <SimulationHero />

      <div className="mt-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <AuthView />
          </div>

          <div className="flex-1">
            <SimulationForm />
          </div>
        </div>
      </div>
    </main>
  );
}