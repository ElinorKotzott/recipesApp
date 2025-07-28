function UnitDropdown({ selectedUnit, onChange, units }) {
    return (
        <select value={selectedUnit} onChange={(e) => onChange(e.target.value)}>
            {units.map((unit) => (
                <option key={unit} value={unit}>
                    {unit.toLowerCase()}
                </option>
            ))}
        </select>
    );
}


export default UnitDropdown;
