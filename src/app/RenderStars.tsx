interface RenderStarsProps {
    rating: number;
}

export default function RenderStars({ rating }: RenderStarsProps) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <span className="stars-container">
            {/* Render full stars */}
            {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                    <img key={`full-${index}`} src="/Star.png" className="star" />
                ))}
            {/* Render half star */}
            {halfStar && (
                <img src="/HalfStar.png" className="star" />
            )}
            {/* Render empty stars */}
            {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                    <img key={`empty-${index}`} src="/EmptyStar.png" className="star" />
                ))}
        </span>
    );
};