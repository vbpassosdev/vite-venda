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
    <table className="w-full text-sm">
      <thead className="border-b">
        <tr>
          {columns.map((col, i) => (
            <th key={i} className="text-left p-2">{col.header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b hover:bg-gray-50">
            {columns.map((col, j) => (
              <td key={j} className="p-2">
                {col.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
