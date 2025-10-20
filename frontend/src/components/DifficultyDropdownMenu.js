function DifficultyDropdownMenu({ selectedDifficulty, onChange, difficulties }) {
  return (
    <select value={selectedDifficulty} onChange={(e) => onChange(e.target.value)}>
      <option value="">-- Select Difficulty --</option>
      {difficulties.map((difficulty) => (
        <option key={difficulty} value={difficulty}>
          {difficulty.toLowerCase()}
        </option>
      ))}
    </select>
  );
}

export default DifficultyDropdownMenu;