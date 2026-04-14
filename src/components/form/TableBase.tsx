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
    <div className="app-table">
      <table className="w-full text-sm">
        <thead className="app-table-head">
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
              className="app-table-row transition"
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
