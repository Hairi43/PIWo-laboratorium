export default ({ book }) => {
    return (
        <section className="bookTile">
            <img src={book.coverImg} alt={`Okładka książki ${book.title}`}
                className="bookImage"
            />
            <section className="bookInfo">
                <span className="bookTitle">{book.title}</span>
                <span className="bookAuthor">Autor: {book.author}</span>
                <span className="bookDescription">Opis: {book.description}</span>
                <span className="bookPrice">Cena: {book.price}zł</span>
                <span className="bookPages">Liczba stron: {book.pageCount}</span>
                <span className="bookCover">Typ okładki: {book.coverType}</span>
            </section>
            <section className="bookInfoBtn">
                <button class="filterNavBtn">Dodaj do koszyka</button>
                <button class="filterNavBtn">Edytuj</button>
                <button class="filterNavBtn">Usuń</button>
            </section>
        </section>
    );
}