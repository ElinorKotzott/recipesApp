import Select from "react-select";

function UnitDropdownMenu({ selectedUnit, onChange, units }) {
  const options = units.map((unit) => ({
    value: unit,
    label: unit.toLowerCase(),
  }));

  const selectedOption = options.find((opt) => opt.value === selectedUnit) || null;

  return (
    <Select
      value={selectedOption}
      onChange={(option) => onChange(option ? option.value : "")}
      options={options}
      placeholder="-- Select Unit --"
      isClearable={false}
    />
  );
}

export default UnitDropdownMenu;
