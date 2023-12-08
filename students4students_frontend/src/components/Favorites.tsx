import { useEffect, useState } from "react";
// Import the component for displaying the user name of the author of a post and the function for creating comments
import GetUserName from "./GetUserName.tsx";
import CreateComment from "./CreateComment.tsx";
// Import the CSS file for styling the component
import "../css/Feed.css";
import "../css/Profil.css";

// Define the type of the category data retrieved from the API for the categories (array of objects)
type Category = {
  id: number;
  name: string;
};

// Define an array of categories
const categories: Category[] = [
  { id: 1, name: "Allgemein" },
  { id: 2, name: "Wohnen" },
  { id: 3, name: "Party" },
  { id: 4, name: "Lernen" },
  { id: 5, name: "Nachhilfe" },
  { id: 6, name: "Sharing" },
  { id: 7, name: "Info" },
  { id: 8, name: "Anfrage" },
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

// The component displays all ads that user liked from the database
function Favorites() {
  // Initialize the state variable for the data items, array of objects
  const [data, setData] = useState<DataItem[]>([]);
  // Initialize the state variable for the enlarged image, type string
  const [enlargedImageUrl, setEnlargedImageUrl] = useState<string | null>(null);
  // Retrieve the email of the logged in user from the local storage
  const email = localStorage.getItem("email");

  // Function to enlarge an image
  const handleEnlargeImage = (imageUrl: string | null) => {
    setEnlargedImageUrl(imageUrl);
  };
  // Function to close the enlarged image
  const handleCloseEnlargedImage = () => {
    setEnlargedImageUrl(null);
  };

  // Function to check if the user has already liked a post
  const checkLikeStatus = (adId: number): boolean => {
    const likeStatusLocalStorage = localStorage.getItem(`likeStatus_${adId}`);
    return likeStatusLocalStorage === "true";
  };

  // Function to update the like status
  const updateLikeStatus = (adId: number, liked: boolean) => {
    localStorage.setItem(`likeStatus_${adId}`, liked.toString());
  };

  // Function to remove the like status
  const removeLikeStatus = (adId: number) => {
    localStorage.removeItem(`likeStatus_${adId}`);
  };

  // If the user like the post, the like status is updated, if the user unlike the post, the like status is removed
  // Input: user id and ad id of the post that the user liked or unliked
  const handleLike = async (user: number, id: number) => {
    try {
      const response = await fetch(
        "http://localhost:8000/students4students/fav",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ user, ad: id }),
        }
      );

      if (response.ok) {
        const currentLikeStatus = checkLikeStatus(id);
        console.log(
          `Like erfolgreich gesendet. Aktueller Status: ${currentLikeStatus}`
        );

        if (currentLikeStatus) {
          // Ad already liked, remove like
          removeLikeStatus(id);
        } else {
          // Ad not liked yet, update like status
          updateLikeStatus(id, true);
        }
        // Fetch data again to update the like count
        fetchData();
      } else {
        alert("Fehler beim Senden des Likes. Bitte versuche es erneut.");
      }
    } catch (error) {
      alert("Fehler beim Senden des Likes. Bitte versuche es erneut.");
    }
  };

  // Function to get the ads from the database and store them in the state variable
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
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch the data from the API when the component is first rendered
  useEffect(() => {
    fetchData();
  }, []);

  // Function to get the name of a category by its id
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unbekannt";
  };

  // Show the last 1000000000 ads and the newest one are at the top
  const startIndex = 0;
  const endIndex = 1000000000;
  const currentItems = data.slice(startIndex, endIndex);
  const reversedItems = [...currentItems].reverse();

  return (
    <div className="main-container">
      <div className=" user-heigth">
        <ul className="feed">
          {/* Display the list of ads for the current page the youngest post at the top  */}
          {reversedItems.map((item) =>
            checkLikeStatus(item.id) ? (
              <li key={item.user} className="post">
                <div className="post-content">
                  <div className="post-header">
                    <img
                      src="./src/assets/students.jpeg"
                      alt="User Profile"
                      className="profile-picture"
                    />
                    <div className="post-user-info">
                      <h2 className="post-username">
                        {/* Set the username */}
                        <GetUserName value={item.user} />
                      </h2>
                      <p className="post-category">
                        {getCategoryName(item.category)}
                      </p>
                    </div>
                  </div>
                  <h2 className="post-title">{item.title}</h2>
                  <p className="post-description">{item.description}</p>
                  <div className="post-image-container">
                    <img
                      src={`data:image/jpeg;base64,${item.image}`}
                      className="post-image"
                      alt="Diesem Beitrag wurde kein Bild angefügt. Lass deiner Fantasie freien Lauf!"
                      onClick={() =>
                        handleEnlargeImage(
                          `data:image/jpeg;base64,${item.image}`
                        )
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
                    <div className="post-likes">
                      <div className="like-icon">
                        <button
                          className={`btn ${
                            checkLikeStatus(item.id) ? "liked" : "unliked"
                          }`}
                          onClick={() => handleLike(item.user, item.id)}
                        ></button>
                      </div>
                    </div>
                    <p className="like-count mr-5">{item.likes} Likes</p>
                  </div>
                  <div className="post-comment mt-3">
                    <CreateComment email={email!} user={item.user} />
                  </div>
                </div>
              </li>
            ) : null
          )}
        </ul>
        <div className="bottom-height-fav"></div>
      </div>
    </div>
  );
}

export default Favorites;
