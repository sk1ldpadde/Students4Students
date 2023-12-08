// This class contains the backend API call-functions
class BackendAPI {
  // Constants which store the URLs of the database-tables
  static REGISTRATION_URL = "http://localhost:8000/students4students/register";
  static DEGREE_INFO_URL = "http://localhost:8000/students4students/degrees";
  static LOGIN_URL = "http://localhost:8000/students4students/login";
  static USER_INFO_URL = "http://localhost:8000/students4students/user";
  static FACULTY_INFO_URL = "http://localhost:8000/students4students/faculty";
  static AD_URL = "http://localhost:8000/students4students/ads";
  static MESSAGE_URL = "http://localhost:8000/students4students/message";
  static FAVORITES_URL = "http://localhost:8000/students4students/fav";
  static AUTHENTIFICATION_URL = "http://localhost:8000/students4students/auth";

  /*
   This API function sends Data (structured by an object) via a HTTP-POST-Request to the 
   required backend-URL. It then returns the HTTP-Server-Response as a json object, wrapped 
   in a promise. The function is asynchronous, therefore you NEED to resolve the returned promise
   by using the "await"-keyword (or the ".then"-method, but "await" is recommended") in order to 
   properly use the returned data.
 
   Best Practice: in order to use these objects, await the function call and cast it as a HTTPResponse-Object (see example below)
   const temporaryResponse = (await BackendAPI.sendObjectDataToBackend<User>(
     formData,
     BackendAPI.REGISTRATION_URL
   )) as HTTPResponse;
   For that, you need to import the HTTPResponse-Interface from API_Classes.tsx
  */
  static async sendObjectDataToBackend<Type>(
    obj: Type,
    url: string
  ): Promise<any> {
    try {
      /*
       With "await fetch", a HTTP-Request is sent, with the method POST and the Content-Type json,
       so that we are returned a json object. The "await"-keyword is used to wait for the response 
       and therefore not return a promise, but the actual data
      */
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      /*
       The Response-stream of the HTTP-Answer is then covered by the asynchronous method json(),
       which therefore also has to be awaited, and the Response stream gets serialized into json.
       Important note: The json()-method is only "available" once per Response, therefore you need
       to store it into a variable, if you want to use it multiple times
      */
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      // If an error occurs, it is logged into the console and then thrown, so that the calling code can handle it
      console.error("Error:", error);
      throw error;
    }
  }
  /*
   This Method is used to fetch data from the backend. It sends a HTTP-GET-Request to the required URL 
   and returns the Data as a json object, wrapped in a promise.
  */
  static async getDataFromBackend(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  /*
   This Method is used to change Data in the Backend. It sends a HTTP-PUT-Request to the required URL 
   and returns Answer as a json object, wrapped in a promise.
  */
  static async changeObjectDataInBackend<Type>(
    obj: Type,
    url: string
  ): Promise<any> {
    try {
      /*
       With "await fetch", a HTTP-Request is sent, with the method POST and the Content-Type json,
       so that we are returned a json object. The "await"-keyword is used to wait for the response 
       and therefore not return a promise, but the actual data
      */
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      /*
       The Response-stream of the HTTP-Answer is then covered by the asynchronous method json(),
       which therefore also has to be awaited, and the Response stream gets serialized into json.
       Important note: The json()-method is only "available" once per Response, therefore you need
       to store it into a variable, if you want to use it multiple times
      */
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      // If an error occurs, it is logged into the console and then thrown, so that the calling code can handle it
      console.error("Error:", error);
      throw error;
    }
  }
  //Untested
  /*
   This Method is used to delete Data in the Backend. It sends a HTTP-DELETE-Request to the required URL 
   and returns Answer as a json object, wrapped in a promise.
  */
  static async deleteObjectDataInBackend<Type>(
    obj: Type,
    url: string
  ): Promise<any> {
    try {
      /*
       With "await fetch", a HTTP-Request is sent, with the method POST and the Content-Type json,
       so that we are returned a json object. The "await"-keyword is used to wait for the response 
       and therefore not return a promise, but the actual data
      */
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      /*
       The Response-stream of the HTTP-Answer is then covered by the asynchronous method json(),
       which therefore also has to be awaited, and the Response stream gets serialized into json.
       Important note: The json()-method is only "available" once per Response, therefore you need
       to store it into a variable, if you want to use it multiple times
      */
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      // If an error occurs, it is logged into the console and then thrown, so that the calling code can handle it
      console.error("Error:", error);
      throw error;
    }
  }
}

export default BackendAPI;
