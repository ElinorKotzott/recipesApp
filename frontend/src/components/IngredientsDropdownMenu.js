function IngredientsDropdownMenu({ selectedIngredient, onChange, ingredients }) {
    return (
        <select value={selectedIngredient} onChange={(e) => onChange(e.target.value)}>
            <option key={ingredients.id} value={ingredients.id}>
                {ingredients.name}
            </option>
        </select>
    );
}

export default IngredientsDropdownMenu;
