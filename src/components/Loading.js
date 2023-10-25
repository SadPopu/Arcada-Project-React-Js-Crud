

function Loading(){
    const styleSheet = {
        mainPaddingTop:{
            paddingTop: '50px',
        }
      };
      
    return(
        <div className="container mt-3" style={styleSheet.mainPaddingTop}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> <span> Loading... Please Wait</span>
        </div>
    )
}

export default Loading;