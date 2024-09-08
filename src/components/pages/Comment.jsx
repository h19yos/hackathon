import { useState } from "react";
import axios from "axios";
import Comments from './GetComments'

function CommentForm() {
    const [comment, setComment] = useState({
        bookId: 1,
        userId: 1,
        content: "",
    });
    const [responseMessage, setResponseMessage] = useState(null);
    const [bookId, setBookId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setComment({ ...comment, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment.bookId || !comment.userId || !comment.content.trim()) {
            setResponseMessage("All fields are required.");
            return;
        }

        try {
            console.log("Payload:", comment);

            const response = await axios.post('http://localhost:8080/api/comment/create/', comment);
            setResponseMessage("Comment posted successfully!");
            console.log("Response:", response.data.data);
        } catch (error) {
            console.error("Error posting comment:", error);
            if (error.response) {
                console.log("Response data:", error.response.data);
                setResponseMessage(`Error posting comment: ${error.response.data.message || "Invalid request."}`);
            } else {
                setResponseMessage("Error posting comment. Please try again.");
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Book ID:</label>
                    <input
                        type="number"
                        name="bookId"
                        value={comment.bookId}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>User ID:</label>
                    <input
                        type="number"
                        name="userId"
                        value={comment.userId}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea
                        name="content"
                        value={comment.content}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit">Post Comment</button>
                <div>
                <h1>Book Details</h1>
                <Comments bookId={bookId} />
                
                {/* Example of changing bookId dynamically */}
                <button onClick={() => setBookId(1)}>View Comments for Book ID 1</button>
            </div>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}

export default CommentForm;
