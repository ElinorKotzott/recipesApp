import React from "react";
import Select from "react-select";

function DifficultyDropdownMenu({selectedDifficulty, onChange, difficulties = []}) {

    const options = difficulties.map((difficulty) => ({
        value: difficulty,
        label: difficulty.toLowerCase(),
    }));


    const selectedOption = selectedDifficulty
        ? {value: selectedDifficulty, label: selectedDifficulty.toLowerCase()}
        : null;

    const handleChange = (option) => {
        onChange(option ? option.value : "");
    };

    return (
        <Select
            options={options}
            value={selectedOption}
            onChange={handleChange}
            placeholder="-- Difficulty --"
            isClearable
        />
    );
}

export default DifficultyDropdownMenu;