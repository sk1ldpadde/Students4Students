import React, { useEffect, useState } from "react";

//Define the type of the props
type CreateCommentProps = {
  email: string;
  user: number;
};

//The component allows users to enter comments and send them to a server after the user data for the recipient has been retrieved
const CreateComment: React.FC<CreateCommentProps> = ({ email, user }) => {
  //Define the type of the user data retrieved from the server
  interface UserData {
    email: "";
  }
  //Initializes the state variable for the user data
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const apiUrl = `http://localhost:8000/students4students/user?id=${user}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data[0]);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Nutzerdaten:", error);
      });
  }, [user]);

  //Initializes the state variable for the comment, type string
  const [comment, setComment] = useState<string>("");

  //Handles changes to the comment input field
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  //Handles the submission of the comment to the server
  const handleCommentSubmit = async () => {
    const apiUrl = `http://localhost:8000/students4students/message`;
    try {
      if (userData !== null) {
        const messageData = {
          to: userData.email,
          from: email,
          message: comment,
        };

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        });

        if (response.ok) {
          setComment("");
        } else {
          console.error("Fehler beim Senden der Nachricht");
        }
      }
    } catch (error) {
      console.error("Fehler beim Senden der Nachricht:", error);
    }
  };

  return (
    <div className="container d-flex align-items-center mb-2">
      {/* Input field for entering comments */}
      <input
        type="text"
        className="form-control flex-grow-1"
        placeholder="Kommentar..."
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        value={comment}
        onChange={handleCommentChange}
      />
      {/* Button to submit comments */}
      <button className="btn btn-primary ml-2" onClick={handleCommentSubmit}>
        Senden
      </button>
    </div>
  );
};

// Export the CreateComment component as the default export
export default CreateComment;
