function IngredientsDropdownMenu({ selectedIngredient, onChange, ingredients }) {
    return (
        <select value={selectedIngredient} onChange={(e) => onChange(e.target.value)}>
            <option value="">-- Select Ingredient --</option>
            {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name}
                </option>
            ))}
        </select>
    );
}

export default IngredientsDropdownMenu;
