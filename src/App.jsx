import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setdata] = useState([]);
  
  const [loading, setloading] = useState(true);
  
  const [currentpage, setcurrentpage] = useState(1);
  
  const [postsperpage, setpostsperpage] = useState(10);


  
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setdata(data);
        setloading(false);
      } catch (error) {
        alert('Error');
      }
    };

    fetchdata();
  }, []);

  

  const indexoflastpost = currentpage * postsperpage;
  const indexoffirstpost = indexoflastpost - postsperpage;
  const currentposts = data.slice(indexoffirstpost, indexoflastpost);
  const totalpages = Math.ceil(data.length / postsperpage);

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

  
  return (
    <>
      <h2>Pagination</h2>
      <ul>
        {currentposts.map((post) => (
          <li key={post.id}>
            {post.id} - {post.title}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => paginate(1)}>First</button>

        <button disabled={currentpage === 1} onClick={() => paginate(currentpage - 1)}>
          Previous
        </button>

        {new Array(totalpages).fill(0).map((_, index) => (
          <button
            className={currentpage === index + 1 ? 'active' : ''}
            key={index + 1}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button disabled={currentpage === totalpages} onClick={() => paginate(currentpage + 1)}>
          Next
        </button>

        <button onClick={() => paginate(totalpages)}>Last</button>
      </div>
    </>
  );
}

export default App;
