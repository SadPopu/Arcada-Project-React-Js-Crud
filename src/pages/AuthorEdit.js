import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

function AuthorEdit(){

    let {id} = useParams();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [inputErrorList, setInputErrorList] = useState({});
    const [author, setAuthor] = useState({});

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/authors/${id}/edit`).then(res => {
            console.log(res);
            setAuthor(res.data.author);
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
        setAuthor({...author, [e.target.name]:e.target.value})
    }

    const updateAuthor= (e) => {
        e.preventDefault();

        setLoading(true)

        const data ={
            name: author.name,
            surname: author.surname,
        }

        axios.put(`http://127.0.0.1:8000/api/authors/${id}/edit`, data).then(res => {

            alert(res.data.message);
            navigate('/authors');
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
            <div className="container mt-5">
                <Loading/>
            </div>
        )
    }

    if(Object.keys(author).length === 0){
        return(
            <div className="container">
                <h4>No such Author Found</h4>
            </div>
        )

    }
    return(
        <div>
             <div className="container mt-5" style={{paddingTop:"50px"}}>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Edit Author
                                <Link to="/authors/" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateAuthor}>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="Text" name="name" value={author.name} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{inputErrorList.name}</span>
                                </div>   
                                <div className="mb-3">
                                    <label>Surname</label>
                                    <input type="Text" name="surname" value={author.surname} onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{inputErrorList.surname}</span>
                                </div>    
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Update Author</button>
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

export default AuthorEdit;