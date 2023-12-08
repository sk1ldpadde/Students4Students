import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// This file is for Mocking HTTP-requests in tests
// each and every request call will be intercepted by msw and mocked with the following handlers

// Define mock request handlers for your API endpoints
export const restHandlers = [
  // Mocking a login request
  http.post(
    "http://localhost:8000/students4students/login",
    async ({ request }) => {
      const reqJSON = (await request.json()) as {
        username: string;
        password: string;
      };
      if (
        reqJSON.username === "test@lehre.dhbw-stuttgart.de" &&
        reqJSON.password === "test"
      ) {
        return HttpResponse.json(
          { code: 0, message: "successfully logged in." },
          { status: 200 }
        );
      } else if (
        reqJSON.username === "test@lehre.dhbw-stuttgart.de" &&
        reqJSON.password !== "test"
      ) {
        return HttpResponse.json(
          { code: -5, message: "given password is not correct." },
          { status: 400 }
        );
      } else if (reqJSON.username !== "test@lehre.dhbw-stuttgart.de") {
        return HttpResponse.json(
          { code: -4, message: "user with given email does not exist." },
          { status: 400 }
        );
      } else {
        return HttpResponse.json(
          { code: -404, message: "unknown error." },
          { status: 400 }
        );
      }
    }
  ),

  // Mocking a register request
  http.post(
    "http://localhost:8000/students4students/register",
    async ({ request }) => {
      const reqJSON = (await request.json()) as {
        first_name: string;
        surname: string;
        age: string;
        degree: string;
        semester: string;
        partner_company: string;
        email: string;
        username: string;
        password: string;
      };
      const passwordRegex = /\b[0-9a-fA-F]{64}/gm;
      if (
        reqJSON.email.endsWith("@lehre.dhbw-stuttgart.de") &&
        passwordRegex.test(reqJSON.password)
      ) {
        return HttpResponse.json(
          { code: 1, message: "user successfully registered." },
          { status: 200 }
        );
      } else if (!reqJSON.email.endsWith("@lehre.dhbw-stuttgart.de")) {
        return HttpResponse.json(
          { code: -1, message: "email format is not correct." },
          { status: 400 }
        );
      } else if (!passwordRegex.test(reqJSON.password)) {
        return HttpResponse.json(
          { code: -2, message: "password format is not correct." },
          { status: 400 }
        );
      } else {
        return HttpResponse.json(
          { code: -404, message: "unknown error." },
          { status: 400 }
        );
      }
    }
  ),
];

// Create an MSW server and pass in the request handlers
const server = setupServer(...restHandlers);

// Start the server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Close the server after all tests
afterAll(() => server.close());

// Reset request handlers after each test (important for test isolation)
afterEach(() => server.resetHandlers());
