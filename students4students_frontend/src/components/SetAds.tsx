import React, { useState, ChangeEvent, FormEvent } from "react";

// Component to create ads and store them in the database
const CreateAd: React.FC = () => {
  // Store the id of the user in the variable user_id
  const user_id = localStorage.getItem("userId");

  // Define the type of the form data and initialize the state variable for the form data
  const [formData, setFormData] = useState({
    user: user_id,
    category: 1,
    title: "",
    image: "",
    description: "",
    likes: 0,
  });

  // Event handler for file input change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  // Callback function for handling the loaded file content
  const _handleReaderLoaded = (e: ProgressEvent<FileReader>) => {
    if (e.target) {
      const binaryString = e.target.result as string;
      handleImageChange(btoa(binaryString));
    }
  };

  // Define an array of categories with their respective colors for the labels in the feed
  const categories = [
    { id: 1, name: "Allgemein" },
    { id: 2, name: "Wohnen" },
    { id: 3, name: "Party" },
    { id: 4, name: "Lernen" },
    { id: 5, name: "Nachhilfe" },
    { id: 6, name: "Sharing" },
    { id: 7, name: "Info" },
    { id: 8, name: "Anfrage" },
  ];

  // Initialize the state variable for the isCreated boolean
  const [isCreated, setIsCreated] = useState(false);

  // Event handler for form input change (except file input)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for category selection change
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      category,
    });
  };

  // Event handler for image change and store it in the form data state variable as a string (base64 encoded)
  const handleImageChange = (base64Image: string) => {
    setFormData({
      ...formData,
      image: base64Image,
    });
  };

  // Event handler for form submit and store the ad in the database via the API
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/students4students/ads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Convert the form data to JSON and send it in the request body
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Ad created successfully");
        // Set the isCreated state variable to true to display a success message and a button to create a new ad
        setIsCreated(true);
      } else {
        const errorData = await response.json();
        if (errorData.message) {
          console.error("Error creating ad:", errorData.message);
        }
        console.error("Error creating ad");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="form-group container mt-5 text-black bg-white">
      <h2>Erstelle hier deinen Beitrag und teile Ihn</h2>
      <h5>Ich brauche den Gossip!</h5>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src="./src/assets/student.jpg"
          alt="Dashboard-Influencer"
          width={"80px"}
        />
      </div>
      {/* Display the success of the ad creation and have the possibility to create another one  */}
      {isCreated ? (
        <div>
          <p>Beitrag wurde erfolgreich erstellt.</p>
          <button
            className="btn btn-primary"
            onClick={() => setIsCreated(false)}
          >
            Neuen Beitrag erstellen
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="form-label">
              Give it a Headline:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="description" className="form-label">
              C´mon more details:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Well, what is it about?
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="form-select"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Add a picture:
            </label>
            <input
              type="file"
              name="image"
              id="file"
              className="form-control"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-outline-danger">
            Beitrag erstellen
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateAd;
