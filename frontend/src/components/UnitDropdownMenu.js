function UnitDropdownMenu({ selectedUnit, onChange, units }) {
  return (
    <select value={selectedUnit} onChange={(e) => onChange(e.target.value)}>
      <option value="">-- Select Unit --</option>
      {units.map((unit) => (
        <option key={unit} value={unit}>
          {unit.toLowerCase()}
        </option>
      ))}
    </select>
  );
}

export default UnitDropdownMenu;
