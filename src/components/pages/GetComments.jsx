import { useState, useEffect } from "react";
import axios from "axios";


function GetComments({ bookId }) {//-
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/comment/get-comments?bookId=${bookId}`);
                setComments(response.data.data);  // Assuming the response is in `data.data`
            } catch (error) {
                console.error("Error fetching comments:", error);
                setError("Could not fetch comments. Please try again later.");
            }
        };

        if (bookId) {
            fetchComments();
        }
    }, [bookId]);  // Fetch comments whenever bookId changes

    return (
        <div>
            <h2>Comments for Book ID: {bookId}</h2>
            {error && <p>{error}</p>}
            
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.commentId}>
                            <p><strong>User {comment.userId}:</strong> {comment.content}</p>
                            <p><em>Posted on: {new Date(comment.createdAt).toLocaleString()}</em></p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments available for this book.</p>
            )}
        </div>
    );
}

export default GetComments;
