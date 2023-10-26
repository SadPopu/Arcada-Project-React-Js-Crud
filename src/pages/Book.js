import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function Book(){
    
    const styleSheet = {
        table: {
          backgroundColor: 'white',
        },
        tableLine: {
          borderBottom: '1px solid #0001', 
        },
        tableHeader:{
            paddingTop: '30px',
        },
        tableNamePosition:{
            width: '150px',
        },
        tableEditPosition:{
            float: 'right',
            width: '70px',
        },
        tableDeletePosition:{
            width: '70px',
        },
        createButton:{
            marginRight: '30px',
        },
        mainPaddingTop:{
            paddingTop: '50px',
        }
      };

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [noBooks, setNoBooks] = useState(false);
    

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/books')
            .then((res) => {
                console.log(res);
                setBooks(res.data.books);
                setLoading(false);
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        setNoBooks(true)
                        setLoading(false);
                    } else if (error.response.status === 500) {
                        setNoBooks(true)
                        setLoading(false);
                    }
                }
            });
    }, []);
    

    const deleteBook= (e, id) =>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting ..."

        axios.delete(`http://127.0.0.1:8000/api/books/${id}/delete`).then(res => {

            alert(res.data.message);
            thisClicked.closest("tr").remove();
        }).catch(function(error) {
            if(error.response) {
                if(error.response.status === 404){
                    alert(error.response.data.message)
                    thisClicked.innerText = "Delete ";
                } 
                if(error.response.status === 500){
                    alert(error.response.data.message)
                }
            }
        })

    }

    if(loading){
        return(
            <div className="container mt-5">
                <Loading/>
            </div>
        )
    }

    if (noBooks) {
        return (
            
          <div className="container mt-5" style={{ ...styleSheet.mainPaddingTop, textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>No books found. Do you want to create a new book?</h1>
            <Link
              to="/books/create"
              className="btn btn-primary"
              style={styleSheet.createButton}
            >
              Add Book
            </Link>
            <img style={{marginTop:"50px"}} src={process.env.PUBLIC_URL + '/thinking.png'} alt="Service" />
          </div>
        );
      }

    var bookDetails ="";
    bookDetails = books.map((item, index) => {
        return (
             <tr key={index} style={styleSheet.tableLine}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.author.name} {item.author.surname}</td>
                <td>
                    <Link to={`/books/${item.id}/edit`} className="btn btn-success" style={styleSheet.tableEditPosition}> Edit </Link>
                </td>
                <td>
                    <button type="button" onClick={(e)=> deleteBook(e, item.id)}  style={styleSheet.tableEditPosition} className="btn btn-danger"> Delete </button>
                </td>
             </tr>
        )
    });
    return(
        <div className="container mt-5" style={styleSheet.mainPaddingTop}>
            <div className="row">
                <div className="col-md-12">
                    
                        <div className="card-header">
                            <h4>Books List
                                <Link to="/books/create" className="btn btn-primary float-end"  style={styleSheet.createButton}>Add Book</Link>
                            </h4>
                        </div>
                        <div className="card-body" style={styleSheet.tableHeader}>
                        <table className="table table-borderless" >
                                <thead>
                                    <tr>
                                        <th style={styleSheet.tableHeader}>ID</th>
                                        <th style={{ ...styleSheet.tableNamePosition, ...styleSheet.tableHeader }}>Title</th>
                                        <th style={styleSheet.tableHeader}>Description</th>
                                        <th style={styleSheet.tableHeader}>Author</th>
                                        <th style={{ ...styleSheet.tableEditPosition, ...styleSheet.tableHeader }}>Edit</th>
                                        <th style={{ ...styleSheet.tableDeletePosition, ...styleSheet.tableHeader }}>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookDetails}
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Book;