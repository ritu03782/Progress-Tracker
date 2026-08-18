function FormField({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm text-slate-300 font-medium">{label}</label>
      {children}
    </div>
  );
}
export default FormField;