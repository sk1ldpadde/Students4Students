import { useEffect, useState } from "react";

// Define the type of the data items retrieved from the server (array of objects)
type DataItem = {
  id: number;
  name: string;
  faculty: number;
};

// The component displays all degrees offered by the university
function Degrees() {
  // Define the number of items per page
  const itemsPerPage = 10;
  // Initialize the state variable for the data items, array of objects
  const [data, setData] = useState<DataItem[]>([]);
  // Initialize the state variable for the current page, type number
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch the data from the API
  const fetchData = async () => {
    try {
      //API endpoint for fetching all degrees
      const apiUrl = "http://localhost:8000/students4students/degrees";
      const response = await fetch(apiUrl);
      const result = await response.json();
      //Store the data in the state variable
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch the data from the API when the component is first rendered
  useEffect(() => {
    fetchData();
  }, []);

  // Calculate the total number of pages
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // function to switch to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // function to switch to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // function to only show 10 items per page and to switch between pages
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div>
        {/* Display the list of degrees for the current page */}
        <ul>
          {currentItems.map((item) => (
            <li key={item.id}>
              <div className="card w-96 bg-base-100 shadow-xl margin">
                <div className="card-body">
                  <h2 className="card-title">{item.id}</h2>
                  <p>Name: {item.name}</p>
                  <p>Faculty: {item.faculty}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* Pagination controls */}
        <nav>
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <button
                className="join-item btn btn-outline"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            <li className="page-item">
              <button
                className="join-item btn btn-outline"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Degrees;
