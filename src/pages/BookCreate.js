import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function BookCreate(){

    const styleSheet = {
        mainPaddingTop:{
            paddingTop: '50px',
        }
      };
      
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [inputErrorList, setInputErrorList] = useState({});

    const [book, setBook] = useState({
        title:'',
        description:'',
        author_id:''
    });

    const [authors, setauthors] = useState([]);

    useEffect(() => {
        
        axios.get('http://127.0.0.1:8000/api/authors').then(res => {
            console.log(res);
            setauthors(res.data.authors);
            setLoading(false);
        });

    }, [])

    const handleInput = (e) => {
        e.persist();
        setBook({...book, [e.target.name]:e.target.value})
    }

    const saveAuthor= (e) => {
        e.preventDefault();

        setLoading(true)

        const data ={
            title: book.title,
            description: book.description,
            author_id: book.author_id
        }

        axios.post('http://127.0.0.1:8000/api/books', data).then(res => {

            alert(res.data.message);
            navigate('/books');
            setLoading(false);
        }).catch(function(error) {
            if(error.response) {
                if(error.response.status === 422){
                    setInputErrorList(error.response.data.errors)
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

    return(
        <div>
             <div className="container mt-5" style={styleSheet.mainPaddingTop}>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Author
                                <Link to="/books/" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveAuthor}>
                                <div className="mb-3">
                                    <label>Title</label>
                                    <input type="Text" name="title" value={book.title} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{inputErrorList.title}</span>
                                </div>   
                                <div className="mb-3">
                                    <label>Description</label>
                                    <input type="Text" name="description" value={book.description} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{inputErrorList.description}</span>
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
                                    <button type="submit" className="btn btn-primary">Save Book</button>
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

export default BookCreate;