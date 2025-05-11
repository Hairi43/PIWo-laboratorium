import BookTile from "./BookTile";

export default function BookListing({ filteredBooks, filter }) {
    const hasActiveFilters =
        filter.author !== "" ||
        filter.coverType !== "" ||
        filter.priceFrom !== "" ||
        filter.priceTo !== "" ||
        filter.pagesFrom !== "" ||
        filter.pagesTo !== "" ||
        filter.description !== "";

    if (filteredBooks.length === 0 && hasActiveFilters) {
        return <p>Brak wyników</p>;
    }

    if (filteredBooks.length === 0 && !hasActiveFilters) {
        return <p>Ładowanie książek...</p>;
    }

    return (
        <section className="bookListing">
            {filteredBooks.map((book) => (<BookTile key={book.id} book={book} />))}
        </section>
    );
}
