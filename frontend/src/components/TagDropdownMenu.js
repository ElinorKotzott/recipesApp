import React from "react";
import Select from "react-select";

function TagDropdownMenu({selectedTags = [], onChange, tags = []}) {
    const difficultyTags = ["easy", "medium", "difficult"];

    const selectedDifficultyTag = selectedTags.find(tag =>
        difficultyTags.includes(tag.text)
    );

    const options = tags.map(tag => {
        const isDifficultyTag = difficultyTags.includes(tag.text);
        const isDisabled =
            selectedDifficultyTag &&
            isDifficultyTag &&
            tag.text !== selectedDifficultyTag.text;

        return {
            value: tag.id,
            label: tag.text,
            isDisabled: isDisabled,
        };
    });

    const selectedOptions = selectedTags.map(tag => ({
        value: tag.id,
        label: tag.text,
    }));

    const handleChange = (newSelectedOptions) => {
        const newSelectedTags = newSelectedOptions
            ? newSelectedOptions.map(option => ({
                id: option.value,
                text: option.label,
            }))
            : [];

        onChange(newSelectedTags);
    };

    return (
        <Select
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            closeMenuOnSelect={false}
            isMulti
            placeholder="-- Tags --"
            isOptionDisabled={(option) => option.isDisabled}
        />
    );
}

export default TagDropdownMenu;
