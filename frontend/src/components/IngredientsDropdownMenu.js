import Select from "react-select";

function IngredientsDropdownMenu({ selectedIngredient, onChange, ingredients }) {
  const options = ingredients.map((ingredient) => ({
    value: ingredient.id,
    label: ingredient.name,
  }));

  const selectedOption =
    options.find((opt) => opt.value === selectedIngredient) || null;

  return (
    <Select
      value={selectedOption}
      onChange={(option) => onChange(option ? option.value : "")}
      options={options}
      placeholder="-- Select Ingredient --"
      isClearable={false}
    />
  );
}

export default IngredientsDropdownMenu;
