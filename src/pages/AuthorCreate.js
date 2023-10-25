import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function AuthorCreate(){

    const styleSheet = {
        mainPaddingTop:{
            paddingTop: '50px',
        }
      };
      
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [inputErrorList, setInputErrorList] = useState({});

    const [author, setAuthor] = useState({
        name:'',
        surname:''
    });

    const handleInput = (e) => {
        e.persist();
        setAuthor({...author, [e.target.name]:e.target.value})
    }

    const saveAuthor= (e) => {
        e.preventDefault();

        setLoading(true)

        const data ={
            name: author.name,
            surname: author.surname,
        }

        axios.post('http://127.0.0.1:8000/api/authors', data).then(res => {

            alert(res.data.message);
            navigate('/authors');
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
                                <Link to="/authors/" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveAuthor}>
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
                                    <button type="submit" className="btn btn-primary">Save Author</button>
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

export default AuthorCreate;