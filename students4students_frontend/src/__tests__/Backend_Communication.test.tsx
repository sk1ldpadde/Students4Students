// These are the Unit Tests for the Backend_Communication.tsx file
// Import necessary modules and components
import { expect, test, describe } from "vitest";
import BackendAPI from "../logic/API_BackendCommunication";
import { HTTPResponse, User } from "../logic/API_Classes";

// Registration Test Cases:
describe("Register Test cases", () => {
  // Define a test user with user information
  const testUser: User = {
    first_name: "Max",
    surname: "Mustermann",
    age: "21",
    degree: "1",
    semester: "3",
    partner_company: "Daimler",
    email: "test@lehre.dhbw-stuttgart.de",
    username: "TestUser",
    password:
      "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
  };

  // Test case: Successful registration
  test("Register Test: Register successful", async () => {
    // Send the test user data to the backend registration URL
    const returnedPromise = (await BackendAPI.sendObjectDataToBackend<User>(
      testUser,
      BackendAPI.REGISTRATION_URL
    )) as HTTPResponse;

    // Assert that the HTTP response code is 1 (success)
    expect(returnedPromise.code).toBe(1);
  });

  // Test case: Incorrect email format
  test("Register Test: Email format incorrect", async () => {
    // In this line we change the email address to an incorrect format using the "..." operator
    // The "..." creates a shallow copy of testUser and then overwrites the attribute "email"
    const testUser1: User = { ...testUser, email: "lalala@gmail.com" };

    // Send the modified user data to the backend registration URL
    const returnedPromise = (await BackendAPI.sendObjectDataToBackend<User>(
      testUser1,
      BackendAPI.REGISTRATION_URL
    )) as HTTPResponse;

    // Assert that the HTTP response code is -1 (incorrect email format)
    expect(returnedPromise.code).toBe(-1);
  });

  // Test case: Incorrect password format
  test("Register Test: Password format is not in SHA256", async () => {
    // Create a copy of the test user and change the password format
    const testUser2: User = {
      ...testUser,
      password: "lalala",
    };

    // Send the modified user data to the backend registration URL
    const returnedPromise = (await BackendAPI.sendObjectDataToBackend<User>(
      testUser2,
      BackendAPI.REGISTRATION_URL
    )) as HTTPResponse;

    // Assert that the HTTP response code is -2 (incorrect password format)
    expect(returnedPromise.code).toBe(-2);
  });
});

// Login Test Cases:
describe("Login Test Cases", () => {
  // Test case: Successful login
  test("Login Test: Login successful", async () => {
    const testLoginData = {
      username: "test@lehre.dhbw-stuttgart.de",
      password: "test",
    };

    // Send login data to the backend login URL
    const returnedPromise = (await BackendAPI.sendObjectDataToBackend(
      testLoginData,
      BackendAPI.LOGIN_URL
    )) as HTTPResponse;

    // Assert that the HTTP response code is 0 (successful login)
    expect(returnedPromise.code).toBe(0);
  });

  // Test case: Incorrect password
  test("Login Test: Password wrong", async () => {
    const testLoginData = {
      username: "test@lehre.dhbw-stuttgart.de",
      password: "lala",
    };

    // Send login data with incorrect password to the backend login URL
    const returnedPromise = (await BackendAPI.sendObjectDataToBackend(
      testLoginData,
      BackendAPI.LOGIN_URL
    )) as HTTPResponse;

    // Assert that the HTTP response code is -5 (incorrect password)
    expect(returnedPromise.code).toBe(-5);
  });

  // Test case: Incorrect username
  test("Login Test: Username wrong", async () => {
    const testLoginData = {
      username: "lala",
      password: "test",
    };

    // Send login data with incorrect username to the backend login URL
    const returnedPromise = (await BackendAPI.sendObjectDataToBackend(
      testLoginData,
      BackendAPI.LOGIN_URL
    )) as HTTPResponse;

    // Assert that the HTTP response code is -4 (incorrect username)
    expect(returnedPromise.code).toBe(-4);
  });
});
