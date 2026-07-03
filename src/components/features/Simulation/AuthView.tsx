import {
  BookOpen,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

export function AuthView() {
  const features = [
    {
      icon: BookOpen,
      title: "Aprenda a investir",
      description: "Conteúdos simples para criar uma base financeira sólida.",
      color: "text-primary bg-primary/10",
    },
    {
      icon: TrendingUp,
      title: "Simule seus rendimentos",
      description: "Visualize o crescimento do seu patrimônio com juros compostos.",
      color: "text-emerald-400 bg-emerald-500/10",
    },
    {
      icon: Target,
      title: "Defina metas",
      description: "Planeje objetivos e acompanhe sua evolução financeira.",
      color: "text-amber-400 bg-amber-500/10",
    },
    {
      icon: Sparkles,
      title: "IA Financeira",
      description: "Receba orientações inteligentes para tomar melhores decisões.",
      color: "text-sky-400 bg-sky-500/10",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-background p-8 text-foreground lg:p-12">
      {/* Background */}
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl" />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <Sparkles size={16} />
          Educação Financeira Inteligente
        </span>

        <h2 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
          Construa um futuro financeiro
          <span className="block bg-gradient-to-r from-primary via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            com mais segurança.
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Aprenda a organizar seu dinheiro, simule investimentos, acompanhe suas
          metas e conte com uma inteligência artificial para apoiar suas
          decisões financeiras.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card"
            >
              <div
                className={`mb-4 inline-flex rounded-xl p-3 ${color}`}
              >
                <Icon size={22} />
              </div>

              <h3 className="font-semibold text-foreground">{title}</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 text-primary">
          <span className="font-medium">
            Comece hoje e acompanhe sua evolução financeira.
          </span>
        </div>
      </div>
    </section>
  );
}