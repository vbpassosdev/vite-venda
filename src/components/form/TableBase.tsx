interface Column<T> {
  header: string
  render: (row: T) => React.ReactNode
}

interface TableBaseProps<T> {
  data: T[]
  columns: Column<T>[]
}

export function TableBase<T>({ data, columns }: TableBaseProps<T>) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(148,163,184,0.12)]">
      <table className="w-full text-sm">
        <thead className="bg-[linear-gradient(180deg,#eff6ff_0%,#f8fbff_100%)] border-b border-sky-100">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-sky-800"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-slate-100 transition hover:bg-[linear-gradient(180deg,#f8fbff_0%,#fefefe_100%)] last:border-b-0"
            >
              {columns.map((col, j) => (
                <td key={j} className="px-4 py-4 align-middle text-slate-700">
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
