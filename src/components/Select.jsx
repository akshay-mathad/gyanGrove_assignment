export default function Select({ children, onChange, value }) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className="select"
    >
      {children}
    </select>
  );
}
