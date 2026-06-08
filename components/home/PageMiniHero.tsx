interface PageMiniHeroProps {
  title: string;
  subtitle: string;
}

export function PageMiniHero({ title, subtitle }: PageMiniHeroProps) {
  return (
    <div className="bg-hero-bg px-6 pb-12 pt-28 md:px-12 md:pb-12 md:pt-[80px]">
      <h1 className="text-[40px] font-extrabold uppercase leading-none text-white md:text-[56px]">
        {title}
      </h1>
      <div className="mt-2 h-1 w-[120px] bg-hero-orange" />
      <p className="mt-4 text-sm uppercase tracking-[0.08em] text-[#888888]">{subtitle}</p>
    </div>
  );
}
