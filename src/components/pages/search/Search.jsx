import { useState } from "react";
import axios from "axios";
import SearchIcon from '../../../assets/03.png';

function Search() {
  const [bookTitle, setBookTitle] = useState(""); // State for the book title search input
  const [description, setDescription] = useState(""); // State for the description input
  const [films, setFilms] = useState([]); // State to store the list of films
  const [film, setFilm] = useState({ bookTitle: "", bookAuthor: "" }); // State for the single film found by description
  const [error, setError] = useState(null); // State to handle errors

  // Search by title (returns multiple films)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/Book/search/', {
        bookTitle: bookTitle,
      });
      setFilms(response.data.data); // Set films (array of books)
      setFilm(null); // Clear the description search result if using the title search
      setError(null); // Clear any previous error message
    } catch (error) {
      console.error("Error fetching films:", error);
      setError("Error fetching film details. Please try again.");
      setFilms([]); // Clear the films state if an error occurs
    }
  };

  // Search by description (returns single film)
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/Book/find-by-description/', {
        description: description,
      });

      const filmData = response.data.data;

      const parts = filmData.split('\n');
      const bookTitle = parts[0].replace('BookTitle: ', '').trim();
      const bookAuthor = parts[1].replace('BookAuthor: ', '').trim();

      setFilm({ bookTitle, bookAuthor });
      setFilms([]); // Clear the films list if using the description search
    } catch (error) {
      console.error("Error fetching film:", error);
      setError("Error fetching film details. Please try again.");
    }
  };

  return (
    <div>
      <div className="search-container">
        <h1 className='booksrc-title'>ПОИСК КНИГ</h1>

        <div className="search-area">
          <div className="search-area-1">
            {/* Form to search by Title */}
            <form className="search-cont" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                className="search-input"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
              <button type="submit">
                <img src={SearchIcon} alt="Search" />
              </button>
            </form>
          </div>

          <div>
            {/* Form to search by Description */}
            <form className="search-cont" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Film Description"
                className="search-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit">
                <img src={SearchIcon} alt="Search" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {error && <p>{error}</p>} {/* Display error messages if any */}

      {/* Display the result based on title search */}
      {films.length > 0 && (
        <div className="book-container">
          <div className="book-container-cont">
            {films.map((film, index) => (
              <div key={index} className="book-cont">
                <div className="book-content">
                  <div className="book-details2">
                    <div className="book-details1">
                      <h2>{film.bookTitle}</h2>
                      <p><strong>Автор:</strong> {film.bookAuthor}           <strong>Рекомендации:</strong>{film.recommendCount}</p>
                      <p>{film.description}</p>
                    </div>
                    <div className="book-details">
                      <div className="buttons">
                        <button className="read-btn">Подробнее</button>
                        <button className="rec-btn">Рекомендовать</button>
                        <button className="add-btn">Добавить в коллекцию</button>
                      </div>
                    </div>
                  </div>
                  <div className="book-im                                                                                                                                                                                                               age">
                    {film.imageUrl ? (
                      <img src={film.ImageUrl} alt={film.bookTitle} />
                    ) : (
                      <p>Image not available</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display the result based on description search */}
      {film && (
        <div className="book-container">
          <div className="book-cont">
            <p><strong>Title:</strong> {film.bookTitle}</p>
            <p><strong>Author:</strong> {film.bookAuthor}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
