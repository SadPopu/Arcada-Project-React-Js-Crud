import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function Author() {

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
            marginRight: '20px',
        },
        mainPaddingTop:{
            paddingTop: '50px',
        }
      };
      


  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [noAuthors, setNoAuthors] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/authors").then((res) => {
      console.log(res);
      setAuthors(res.data.authors);
      setLoading(false);
    }).catch((error) => {
      if (error.response) {
          if (error.response.status === 404) {
              setLoading(false);
              setNoAuthors(true)
          } else if (error.response.status === 500) {   
              setLoading(false);
              setNoAuthors(true)
          }
      }
  });
}, []);

  const deleteAuthor = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting ...";

    axios
      .delete(`http://127.0.0.1:8000/api/authors/${id}/delete`)
      .then((res) => {
        alert(res.data.message);
        thisClicked.closest("tr").remove();
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            alert(error.response.data.message);
            thisClicked.innerText = "Delete";
          }

          if (error.response.status === 404) {
            alert(error.response.data.message);
            thisClicked.innerText = "Delete";
          }
          if (error.response.status === 500) {
            alert(error.response.data.message);
          }
        }
      });
  };

  if(loading){
    return(
        <div className="container mt-5">
            <Loading/>
        </div>
    )
}

  
  if (noAuthors) {
    return (
      <div className="container mt-5" style={{ ...styleSheet.mainPaddingTop, textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1>No authors found. Do you want to create a new author?</h1>
        <Link
          to="/authors/create"
          className="btn btn-primary"
          style={styleSheet.createButton}
        >
          Add Author
        </Link>
        <img style={{marginTop:"50px"}} src={process.env.PUBLIC_URL + '/thinking.png'} alt="Service" />
      </div>
    );
  }
  

  var authorDetails = authors.map((item, index) => {
    return (
      <tr key={index} style={styleSheet.tableLine}>
        <td >{item.id}</td>
        <td >{item.name}</td>
        <td >{item.surname}</td>
        <td >
          <Link to={`/authors/${item.id}/edit`} className="btn btn-success" style={styleSheet.tableEditPosition}>
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => deleteAuthor(e, item.id)}
            className="btn btn-danger"
            style={styleSheet.tableEditPosition}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    

    <div className="container mt-5" style={styleSheet.mainPaddingTop}>
      <div className="row">
        <div className="col-md-12">
          
            <div className="card-header">
              <h4>
                Authors List
                <Link
                  to="/authors/create"
                  className="btn btn-primary float-end"
                  style={styleSheet.createButton}
                >
                  Add Author
                </Link>
              </h4>
            </div>
           
            <div className="card-body" style={styleSheet.tableHeader}>
              <table className="table table-borderless" >
              <thead>
                    <tr>
                        <th style={styleSheet.tableHeader}>ID</th>
                        <th style={{ ...styleSheet.tableNamePosition, ...styleSheet.tableHeader }}>Name</th>
                        <th style={styleSheet.tableHeader}>Surname</th>
                        <th style={{ ...styleSheet.tableEditPosition, ...styleSheet.tableHeader }}>Edit</th>
                        <th style={{ ...styleSheet.tableDeletePosition, ...styleSheet.tableHeader }}>Delete</th>
                    </tr>
                </thead>

                <tbody>{authorDetails}</tbody>
              </table>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default Author;
