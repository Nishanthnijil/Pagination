import { useState, useEffect} from 'react'

import './App.css'

function App() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  // if loading is true it does as above

//states for pagination

const[currentpage, setcurrentpage] = useState(1);
const[postsperpage, setpostsperpage] = useState(10);

  // data fetching

  useEffect(()=>{

   
     // fetchdata is function
     const fetchdata = async()=>{
      try{
      // getting the values in the name of respose
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      //converting the response to json
      const data = await response.json();
      //setting the recieved data to the state
      setdata(data);
      //setting the loading to false
      setloading(false);
    }
    catch(error){
         alert("Error");
    }
   };

   //calling the function
    fetchdata();
  },[]);

  //above: use effect function is used to fetch the data and return them as an array

  const indexoflastpost = currentpage * postsperpage;
// indexoflastpost will return the index of the last entry of the page
  const indexoffirstpost= indexoflastpost - postsperpage;
  // indexoffirstpost will return the index of the first entry of the page

  const currentposts= data.slice(indexoffirstpost, indexoflastpost);
// currentposts will return the entries of the current page



const totalpages= Math.ceil(data.length/postsperpage);
//ceil is used to round off and return the total number of pages


const paginate=(pageNumber)=>setcurrentpage(pageNumber);
//paginate will decide the current page number and "pageNumber" will changes when we click any of thr buttons

  return (
    <>
    <h2>Pagination</h2>
     <ul>
      {currentposts.map((post)=>(
        <li key={post.id}>
          {post.id} - {post.title}
        </li>
      ))}
     </ul>

     {/* //pagination part */}
     <div className="pagination">
      <button onClick={()=>paginate(1)}>First</button>

      <button 
       disabled={currentpage === 1}
      onClick={()=>paginate(currentpage - 1)}>Previous</button>


      {new Array(totalpages).fill(0).map((_,index)=>{
        return <button 
        className={currentpage===index+1?"active":""}
        // in order to highlight the current page we are applyring different style to the current page alone
        
        key={index + 1} onClick={()=>paginate(index + 1)} >{index+1}</button>
      })}
{/* above: create a new array, temporaryily filling it with zeros to get no of buttons, 
then by using map funsction we are getting only the index ie (1 to 10), the we are returning the buttons */}

      <button 
       disabled={currentpage === totalpages}
      onClick={()=>paginate(currentpage + 1)}>Next</button>

      <button onClick={()=>paginate(totalpages)}>Last</button>

     </div>
    </>
  )
}
  
export default App;
