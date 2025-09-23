import React from "react";
import Select from "react-select";

function TagDropdownMenu({ selectedTags = [], onChange, tags = [] }) {
    const options = tags.map(tag => ({
        value: tag.id,
        label: tag.text,
    }));

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
            placeholder="-- Select Tags --"
        />
    );
}

export default TagDropdownMenu;
