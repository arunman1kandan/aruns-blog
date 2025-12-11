export default function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold text-foreground">{title}</h1>
      {description && (
        <p className="mt-3 text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
