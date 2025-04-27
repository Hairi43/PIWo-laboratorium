export default function FilterBooks(bookList, filters) {
    return bookList.filter((book) => {
        const price = parseFloat(book.price);
        const pageCount = parseInt(book.pageCount);
    
        const matchAuthor =
          filters.author === "" ||
          book.author?.toLowerCase().includes(filters.author.toLowerCase());
    
        const matchCover =
          filters.coverType === "" ||
          book.coverType?.toLowerCase() === filters.coverType;
    
        const matchPrice =
          (filters.priceFrom === "" || price >= parseFloat(filters.priceFrom)) &&
          (filters.priceTo === "" || price <= parseFloat(filters.priceTo));
    
        const matchPages =
          (filters.pagesFrom === "" || pageCount >= parseInt(filters.pagesFrom)) &&
          (filters.pagesTo === "" || pageCount <= parseInt(filters.pagesTo));
    
        const matchDescription =
          filters.description === "" ||
          book.description?.toLowerCase().includes(filters.description.toLowerCase());
    
        return matchAuthor && matchCover && matchPrice && matchPages && matchDescription;
    });
}