function App (){

    const [value, setValue] = React.useState("");
   
    function randomWord(){
        fetch("https://random-word-api.herokuapp.com/word")
            .then(response => response.json())
            .then(data =>{
                console.log(data[0], typeof(data[0]));
                deleteClass();
                fetchData(data[0]);
            })
    }

    function deleteClass() {
        document.getElementsByClassName('data')[0].innerHTML= "";
      }

    const fetchData=(search)=>{
        //clear class first 
        let url = "https://en.wikipedia.org/w/api.php";
        const params = {
            action: "query",
            list: "search",
            srsearch: search,
            format: "json",
          
        };
        setValue("");
    
        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

        fetch(url)
            .then(function(response){return response.json();})
            .then(function(response) {
            let arr = response.query.search;
            for(let i = 0; i!= arr.length;i++){
                let html = "";
                html += " <div class='card'>";
                html +="<a href='https://en.wikipedia.org/wiki?curid="+arr[i].pageid+"'><h1>"+ arr[i].title+"</h1></a>";
                html += "<p>"+arr[i].snippet+"</p>";
                html += "</div>"
                document.getElementsByClassName('data')[0].innerHTML+=html
            }    
            

            console.log(response);
           
    })
    .catch(function(error){console.log(error);});

    }
    return(
        <>
            <button onClick ={()=>{
                randomWord();
            }}>Click to random search</button>
            <form action="#">
                <input value={value} onChange={(e)=>{
                    setValue(e.target.value)
                    }} type="text" placeholder="search...." name="search"></input>
                <button onClick={()=>{
                    deleteClass()
                    fetchData(value)
                }
                }><i className="fa-solid fa-magnifying-glass"></i></button>   
            </form>
        
        
        <div className="data"></div></>
    )


   
}
    





const root = ReactDOM.createRoot(
    document.getElementById('container')
  );

root.render(<App/>)
