function TagDropdown({ selectedTag, onChange, tags }) {
    return (
        <select
            value={selectedTag?.id || ""}
            onChange={(e) => {
                const tag = tags.find(t => t.id === Number(e.target.value));
                onChange(tag);
            }}
        >
            <option value="">-- Select Tag --</option>
            {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                    {tag.text}
                </option>
            ))}
        </select>
    );
}

export default TagDropdown;
