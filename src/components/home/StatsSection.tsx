const stats = [
  { label: "Live Concerts", value: "150+" },
  { label: "Artists Featured", value: "75+" },
  { label: "Total Attendees", value: "2.5M+" },
  { label: "Cities Covered", value: "25+" },
]

export default function StatsSection() {
  return (
    <section className="py-16 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
