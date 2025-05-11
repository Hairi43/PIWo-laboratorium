import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../Services/init";
import { useUser } from "../Services/UserService";
import { useContext, useState } from "react";
import { BooksContext } from "../Contexts/BooksContext";

export default ({ book }) => {
    const user = useUser();
    const { setBookList, bookList } = useContext(BooksContext);

    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState({ ...book });

    const isOwner = user && book.uid === user.uid;

    const handleDelete = async () => {
        if (!window.confirm("Czy na pewno chcesz usunąć tę książkę?")) return;

        try {
            const docRef = doc(firestore, "bookstore-001", book.id);
            await deleteDoc(docRef);
            setBookList(bookList.filter(b => b.id !== book.id));
        } catch (err) {
            console.error("Błąd przy usuwaniu książki:", err);
            alert("Wystąpił błąd przy usuwaniu książki.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBook(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const docRef = doc(firestore, "bookstore-001", book.id);
            const { id, uid, ...bookDataToUpdate } = editedBook;
            
            await updateDoc(docRef, bookDataToUpdate);
            setBookList(bookList.map(b => (b.id === book.id ? { ...b, ...bookDataToUpdate } : b)));
            setIsEditing(false);
        } catch (err) {
            console.error("Błąd przy edycji książki:", err);
            alert("Nie udało się zapisać zmian.");
        }
    };

    return (
        <section className="bookTile">
            <img src={book.coverImg} alt={`Okładka książki ${book.title}`} className="bookImage" />

            <section className="bookInfo">
                {isEditing ? (
                    <>
                        <input name="title" value={editedBook.title} onChange={handleChange} placeholder="Tytuł" />
                        <input name="author" value={editedBook.author} onChange={handleChange} placeholder="Autor" />
                        <textarea name="description" value={editedBook.description} onChange={handleChange} placeholder="Opis" />
                        <input name="price" value={editedBook.price} onChange={handleChange} placeholder="Cena" />
                        <input name="pageCount" value={editedBook.pageCount} onChange={handleChange} placeholder="Liczba stron" />
                        <input name="coverType" value={editedBook.coverType} onChange={handleChange} placeholder="Typ okładki" />
                    </>
                ) : (
                    <>
                        <span className="bookTitle">{book.title}</span>
                        <span className="bookAuthor">Autor: {book.author}</span>
                        <span className="bookDescription">Opis: {book.description}</span>
                        <span className="bookPrice">Cena: {book.price}zł</span>
                        <span className="bookPages">Liczba stron: {book.pageCount}</span>
                        <span className="bookCover">Typ okładki: {book.coverType}</span>
                    </>
                )}
            </section>

            <section className="bookInfoBtn">
                <button className="filterNavBtn">Dodaj do koszyka</button>
                {isOwner && !isEditing && (
                    <>
                        <button className="filterNavBtn" onClick={() => setIsEditing(true)}>Edytuj</button>
                        <button className="filterNavBtn" onClick={handleDelete}>Usuń</button>
                    </>
                )}
                {isOwner && isEditing && (
                    <>
                        <button className="filterNavBtn" onClick={handleSave}>Zapisz</button>
                        <button className="filterNavBtn" onClick={() => setIsEditing(false)}>Anuluj</button>
                    </>
                )}
            </section>
        </section>
    );
};
