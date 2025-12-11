export default function StatsBar() {
  return (
    <div className="w-full py-6 border-b border-border bg-card/50 animate-fade-in">
      <div className="mx-auto max-w-4xl px-6 flex flex-wrap gap-6 justify-center">
        <div className="text-center">
          <div className="text-xl font-bold text-foreground">IEEE</div>
          <div className="text-xs text-muted-foreground">Published Author</div>
        </div>
        <div className="h-12 w-px bg-border"></div>
        <div className="text-center">
          <div className="text-xl font-bold text-foreground">VIT</div>
          <div className="text-xs text-muted-foreground">Agrithon Winner</div>
        </div>
        <div className="h-12 w-px bg-border"></div>
        <div className="text-center">
          <div className="text-xl font-bold text-foreground">AI/ML</div>
          <div className="text-xs text-muted-foreground">Specialized</div>
        </div>
      </div>
    </div>
  )
}
