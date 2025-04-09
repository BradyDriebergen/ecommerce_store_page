"use client";
import { useEffect, useState, useMemo } from "react";
import FilterPanel from "./FilterPanel";
import ProductModal from "./ProductModal";
import RenderStars from "./RenderStars";

export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

// Interface for JSON products
export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    images: string[];
    thumbnail: string;
    discountPercentage: number;
    rating: number;
    reviews: Review[];
    availabilityStatus: string;
    returnPolicy: string;
    weight: number;
    dimensions: Dimensions;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<string>("alphabetical");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Initial fetch of products
    useEffect(() => {
        setLoading(true);
        fetch('https://igames-takehome.s3.amazonaws.com/products.json')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                throw new Error(err);
            });
    }, []);

    // Sorting logic based on the selected sort method
    const sortedProducts = useMemo(() => {
        const sorted = [...products];
        if (sortBy === "alphabetical") {
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "price") {
            return sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === "ratings") {
            return sorted.sort((a, b) => b.rating - a.rating);
        }
        return sorted;
    }, [products, sortBy]);

    // Filter products based on the selected category
    const filteredProducts = useMemo(() => {
        if (!selectedCategory) return sortedProducts; // If no category is selected, show all products
        return sortedProducts.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase());
    }, [sortedProducts, selectedCategory]);

    const visibleProducts = filteredProducts.slice(0, visibleCount);  

    return (
        <div className="products-page">
            <FilterPanel onCategoryChange={setSelectedCategory} />
            <main className="shop-content">
                <div className="sort-by-container">
                    <div>
                        <label htmlFor="sort-by">Sort By:</label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="alphabetical">Alphabetical</option>
                            <option value="price">Price</option>
                            <option value="ratings">Ratings</option>
                        </select>
                    </div>
                    <p>Showing {filteredProducts.length} Items</p>
                </div>
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <div className="products-grid">
                        {visibleProducts.map((product) => (
                            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                                <img src={product.thumbnail} alt={product.title} className="product-image" />
                                <hr />
                                <div className="product-info">
                                    <h2 className="product-title">{product.title}</h2>
                                    <div className="product-rating">
                                        <RenderStars rating={product.rating} /> {product.rating}
                                    </div>
                                    <p className="product-price">
                                        <span className="original-price">${product.price.toFixed(2)}</span>
                                        <span className="discounted-price">
                                            ${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {visibleCount < filteredProducts.length && (
                    <button className="load-more-button" onClick={() => setVisibleCount(visibleCount + 6)}>
                        Load More Products
                    </button>
                )}
            </main>
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)} // Close modal
                />
            )}
        </div>
    );
}