'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowUpDown } from 'lucide-react'

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'name', label: 'Name A–Z' },
  { value: '-name', label: 'Name Z–A' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: 'description', label: 'Description A–Z' },
  { value: '-description', label: 'Description Z–A' },
]

interface ProductsSortSelectProps {
  currentSort?: string
}

export default function ProductsSortSelect({ currentSort = '' }: ProductsSortSelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1')
    if (val) params.set('sort', val)
    else params.delete('sort')
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-5 h-5 paper-muted flex-shrink-0" />
      <span className="text-sm font-medium paper-muted whitespace-nowrap">Sort:</span>
      <select
        value={currentSort}
        onChange={handleChange}
        className="px-3 py-2 border border-[rgb(var(--color-paper-border))] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm text-slate-950 bg-white"
      >
        <option value="">Default</option>
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
