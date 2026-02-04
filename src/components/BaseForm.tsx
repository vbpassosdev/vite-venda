// components/BaseForm.tsx
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"

type BaseFormProps = {
  title: string
  subtitle?: string
  loading?: boolean
  submitLabel?: string
  onSubmit: (e: React.FormEvent) => void
  children: ReactNode
}

export function BaseForm({
  title,
  subtitle,
  loading = false,
  submitLabel = "Salvar",
  onSubmit,
  children
}: BaseFormProps) {
  return (
    <div className="max-w-3xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {children}

        <div className="flex justify-end pt-4">
          <Button className="bg-purple-500" type="submit" disabled={loading}>
            {loading ? "Salvando..." : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}
