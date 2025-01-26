export function Table({ children }) {
  return <table className="table">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="table-header">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="table-row">{children}</tr>;
}

export function TableCell({ children, className = "" }) {
  return <td className={`table-cell ${className}`}>{children}</td>;
}
