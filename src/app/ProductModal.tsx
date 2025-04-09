import React, { useState } from "react";
import { Product } from "./products";
import RenderStars from "./RenderStars";

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product) return null;

    // Handles swapping images left and right.
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
    };
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

    // Manages image index
    const handleDotClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    // Handles clicking off the product info
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Close the modal only if the user clicks on the overlay, not the modal content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-product-details">
                    <div className="image-carousel">
                        <button className="carousel-arrow left-arrow" onClick={handlePrevImage}>
                            &#8249;
                        </button>
                        <img
                            src={product.images[currentImageIndex]}
                            alt={`${product.title} - ${currentImageIndex + 1}`}
                            className="modal-product-image"
                        />
                        <button className="carousel-arrow right-arrow" onClick={handleNextImage}>
                            &#8250;
                        </button>
                        <div className="carousel-dots">
                            {product.images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentImageIndex ? "active" : ""}`}
                                    onClick={() => handleDotClick(index)}
                                ></span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 style={{ fontSize: "30px" }}>{product.title}</h2>
                        <p style={{fontSize: "14px"}}>Weight: {product.weight}</p>
                        {product.category === 'furniture' &&
                            <p style={{fontSize: "14px", marginTop: "-10px", marginBottom: "10px"}}>
                                Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}
                            </p>
                        }
                        <p>{product.description}</p>
                        <div className="flex-row-1">
                            <p style={{ fontSize: "12px" }}>{product.rating}</p>
                            <RenderStars rating={product.rating} />
                            <p style={{ fontSize: "12px" }}>({product.reviews.length})</p>
                        </div>
                        <div className="flex-row-2">
                            <p style={{ color: "red" }}>-{product.discountPercentage}%</p>
                            <p><strong>
                                ${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
                            </strong></p>
                        </div>
                        <p style={{ fontSize: "10px", marginTop: "-10px" }}>
                            List price <s>{product.price}</s>
                        </p>
                        <div className="modal-product-buttons">
                            <button id="atc-button">Add to Cart</button>
                            <button>Add to Wishlist</button>
                        </div>
                        <hr />
                        <h2>Customer Reviews</h2>
                        {product.reviews.map((review, index) => (
                            <div key={index} className="review">
                                <div style={{ display: "flex" }}>
                                    <p>
                                        <strong>{review.reviewerName}</strong>
                                    </p>
                                    <p>
                                        <RenderStars rating={review.rating} />
                                    </p>
                                    <p style={{ color: "gray" }}>
                                        {new Date(review.date).toLocaleDateString("en-US")}
                                    </p>
                                </div>
                                <p>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}