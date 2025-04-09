import React, { useState } from "react";

interface FilterPanelProps {
    onCategoryChange: (category: string | null) => void; // Callback function prop
}

export default function FilterPanel({ onCategoryChange }: FilterPanelProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Handle radio button change
    const handleRadioChange = (category: string) => {
        setSelectedCategory(category);
        onCategoryChange(category); // Notify the parent component
    };

    // Clear the selected category
    const clearFilters = () => {
        setSelectedCategory(null);
        onCategoryChange(null); // Notify the parent component that no category is selected
    };

    return (
        <aside className="filter-panel">
            <div className="filter-header">
                <h2>Filters</h2>
                <button className="button-as-link" onClick={clearFilters}>
                    Clear Filters
                </button>
            </div>
            <div className="filter-category">
                <h3>Categories</h3>
                <ul>
                    {["Beauty", "Fragrances", "Furniture", "Groceries"].map((category) => (
                        <li key={category}>
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value={category.toLowerCase()}
                                    checked={selectedCategory === category}
                                    onChange={() => handleRadioChange(category)}
                                />
                                {category}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}