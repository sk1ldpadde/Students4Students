import { useEffect, useState } from "react";
// Import the component for displaying the user name of the author of a post and the function for creating comments
import GetUserName from "./GetUserName.tsx";
// Import the CSS file for styling the component
import "../css/Feed.css";

// Define the type of the category data retrieved from the API for the categories (array of objects)
type Category = {
  id: number;
  name: string;
  color: string;
};

// Define an array of categories with their respective colors for the labels in the feed
const categories: Category[] = [
  { id: 1, name: "Allgemein", color: "#239641" },
  { id: 2, name: "Wohnen", color: "#946326" },
  { id: 3, name: "Party", color: "#ff5121" },
  { id: 4, name: "Lernen", color: "#357ddb" },
  { id: 5, name: "Nachhilfe", color: "#712678" },
  { id: 6, name: "Sharing", color: "#8cffa9" },
  { id: 7, name: "Info", color: "#424242" },
  { id: 8, name: "Anfrage", color: "#ccbd70" },
];

// Define the type of the data items retrieved from the API for the ads (array of objects)
type DataItem = {
  id: number;
  user: number;
  category: number;
  title: string;
  image: string;
  description: string;
  likes: number;
};

// The component displays all ads from the database that was created from the logged in user (user_email)
function UserAds() {
  // Initialize the state variable for the data items, array of objects
  const [data, setData] = useState<DataItem[]>([]);
  // Initialize the state variable for the enlarged image, type string
  const [enlargedImageUrl, setEnlargedImageUrl] = useState<string | null>(null);
  // Retrieve the email of the logged in user from the local storage
  const email = localStorage.getItem("email");

  // Define the type of the user data retrieved from the API for the users (array of objects)
  interface UserData {
    id: string;
    email: string;
    password: string;
    username: string;
    first_name: string;
    surname: string;
    age: string;
    degree: string;
    semester: string;
    partner_company: string;
  }

  // Initialize the state variable for the user data
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch the data from the API when the component is first rendered
  useEffect(() => {
    // API call with email to find and output a specific user with the logged in user email address
    const apiUrl = `http://localhost:8000/students4students/user?email=${email}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Store the user data in the state variable
        setUserData(data[0]);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Nutzerdaten:", error);
      });
  }, [email]);

  // Store the id of the logged in user in the variable user_id
  const user_id = userData?.id;

  // Function to enlarge an image
  const handleEnlargeImage = (imageUrl: string | null) => {
    setEnlargedImageUrl(imageUrl);
  };

  // Function to close the enlarged image
  const handleCloseEnlargedImage = () => {
    setEnlargedImageUrl(null);
  };

  // Function to fetch the data from the API to display the ads from the logged in user
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/students4students/ads",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // Assuming result is an array of DataItem objects
      const filteredData = result.filter(
        (item: DataItem) =>
          item.user === (user_id ? parseInt(user_id, 10) : null)
      );

      // Store the data in the state variable
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch the data from the API when the component is first rendered
  useEffect(() => {
    fetchData();
  }, [user_id]); // Fetch data whenever user_id changes

  // Function to get the category name from the array of categories by its id
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unbekannt";
  };

  // Function to get the category color from the array of categories by its id
  const getCategoryColor = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.color : "#000000";
  };

  // Function to delete an ad from the database by its id, only the author of the ad can delete it
  const handleDeleteAd = async (adId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/students4students/ads?id=${adId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(`Anzeige mit der ID ${adId} erfolgreich gelöscht.`);
        fetchData();
      } else {
        console.error(`Fehler beim Löschen der Anzeige mit der ID ${adId}`);
      }
    } catch (error) {
      console.error("Fehler beim Löschen der Anzeige:", error);
    }
  };

  // Define the type of the props for the custom component for the category label
  interface Props2 {
    value: number;
  }

  // Custom component for the category label with the category name and color from the array of categories by its id
  const CustomCategoryLabel: React.FC<Props2> = (props) => {
    const id = props.value;
    const category = getCategoryName(id);
    const color = getCategoryColor(id);

    const customStyle = {
      backgroundColor: color,
      color: "#ffffff",
      borderRadius: "1.1rem",
      padding: "0.15rem 0.65rem",
      fontSize: "0.85em",
    };

    return <span style={customStyle}>{category}</span>;
  };

  // Show the last 1000000000 ads and the newest one are at the top
  const startIndex = 0;
  const endIndex = 1000000000;
  const currentItems = data.slice(startIndex, endIndex);
  const reversedItems = [...currentItems].reverse();

  return (
    <div className="main-container">
      <ul className="feed">
        {/* Display the list of ads for the current page, with the youngest post at the top  */}
        {reversedItems.map((item) => (
          <li key={item.id} className="post">
            <div className="post-content">
              <div className="post-header">
                <img
                  src="./src/assets/students.jpeg"
                  alt="User Profile"
                  className="profile-picture"
                />
                <div className="post-user-info">
                  <h2 className="post-username">
                    <GetUserName value={item.user} />
                  </h2>
                  <CustomCategoryLabel value={item.category} />
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteAd(item.id)}
                >
                  DELETE
                </button>
              </div>
              <h2 className="post-title">{item.title}</h2>
              <p className="post-description">{item.description}</p>
              <div className="post-image-container">
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  className="post-image"
                  alt="Diesem Bild wurde kein Bild angefügt. Lass deiner Fantasie freien Lauf!"
                  onClick={() =>
                    handleEnlargeImage(`data:image/jpeg;base64,${item.image}`)
                  }
                />
              </div>
              {enlargedImageUrl && (
                <div
                  className="enlarged-image-overlay mt-5"
                  onClick={handleCloseEnlargedImage}
                >
                  <img
                    src={enlargedImageUrl}
                    alt="NaNu hier solltest du das Bild in groß sehen können. Gibt es keins?"
                    className="enlarged-image"
                  />
                </div>
              )}
              <div className="post-interactions">
                <p className="like-count mr-5">{item.likes} Likes</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserAds;
