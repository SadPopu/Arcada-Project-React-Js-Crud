import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

function BookEdit(){

    let {id} = useParams();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [inputErrorList, setInputErrorList] = useState({});
    const [book, setBook] = useState({});
    const [authors, setauthors] = useState([]);

    useEffect(() => {
        
        axios.get('http://127.0.0.1:8000/api/authors').then(res => {
            console.log(res);
            setauthors(res.data.authors);
            setLoading(false);
        });

    }, [])


    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/books/${id}/edit`).then(res => {
            console.log(res);
            setBook(res.data.book);
            setLoading(false);
        }).catch(function(error) {
            if(error.response) {
                
                if(error.response.status === 404){
                    alert(error.response.data.message)
                    setLoading(false);
                } 
                if(error.response.status === 500){
                    setInputErrorList(error.response.data)
                    setLoading(false);
                }
            }
            
        });

    }, [id])

    

    const handleInput = (e) => {
        e.persist();
        setBook({...book, [e.target.name]:e.target.value})
    }

    const updateBook= (e) => {
        e.preventDefault();

        setLoading(true)

        const data ={
            title: book.title,
            description: book.description,
            author_id: book.author_id,
        }

        axios.put(`http://127.0.0.1:8000/api/books/${id}/edit`, data).then(res => {

            alert(res.data.message);
            navigate('/books');
            setLoading(false);
        }).catch(function(error) {
            if(error.response) {
                if(error.response.status === 422){
                    setInputErrorList(error.response.data.errors)
                    setLoading(false);
                } 
                if(error.response.status === 404){
                    alert(error.response.data.message)
                    setLoading(false);
                } 
                if(error.response.status === 500){
                    setInputErrorList(error.response.data)
                    setLoading(false);
                }
            }
            
        })
        
        ;
    }

    if(loading){
        return(
            <div>
                <Loading/>
            </div>
        )
    }

    if(Object.keys(book).length === 0){
        return(
            <div className="container">
                <h4>No such Book Found</h4>
            </div>
        )

    }
    return(
        <div>
             <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Edit Book
                                <Link to="/books/" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateBook}>
                                <div className="mb-3">
                                    <label>Book Title</label>
                                    <input type="Text" name="title" value={book.title} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{inputErrorList.name}</span>
                                </div>   
                                <div className="mb-3">
                                    <label>Description</label>
                                    <input type="Text" name="description" value={book.description} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{inputErrorList.surname}</span>
                                </div>    
                                <div className="mb-3">
                                    <label>Author</label>
                                    <select
                                        name="author_id"
                                        value={book.author_id}
                                        onChange={handleInput}
                                        className="form-control"
                                    >
                                        <option value="">Select an Author</option>
                                            {authors.map(author => (
                                                <option key={author.id} value={author.id}>
                                                    {author.name} {author.surname}
                                             </option>
                                          ))}
                                    </select>
                                    <span className="text-danger">{inputErrorList.author_id}</span>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Update Book</button>
                                </div>   
                            </form>    
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookEdit;