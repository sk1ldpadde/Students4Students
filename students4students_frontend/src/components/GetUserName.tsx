import { useState, useEffect } from "react";

// Define the type of the props for the component input
interface Props {
  value: number;
}

// Component to get the username by its id
const GetUserName: React.FC<Props> = (props) => {
  // Store the id of the user in the variable id
  const id = props.value;

  // Define the type of the user data retrieved from the API
  interface UserData {
    email: "";
    password: "";
    username: "";
    first_name: "";
    surname: "";
    age: "";
    degree: "";
    semester: "";
    partner_company: "";
  }

  // Initialize the state variable for the user data
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch the data from the API when the component is first rendered and when the id changes
  // API call with id to find and output a specific user with a unique id
  useEffect(() => {
    const apiUrl = `http://localhost:8000/students4students/user?id=${id}`;

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
  }, [id]);

  // Return the username of the user
  return <div>{userData ? userData.username : id}</div>;
};

export default GetUserName;
