import { describe, expect, test } from "vitest";
import { ChapterRequestResponse, ChapterRequest } from "./route.schema";
import { chapterRequest } from "./route.client";

describe("ChapterRequest", () => {
  test("InvalidEmailThrowsError", () => {
    expect(() =>
      ChapterRequest.parse({
        firstName: "John",
        lastName: "Doe",
        universityEmail: "not an email",
        phoneNumber: "1234567890",
        university: "University of Waterloo",
        universityAddress: "123 University Ave",
        leadershipExperience: "I have lots of leadership experience",
        motivation: "I am very motivated",
        availabilities: "I am available",
        questions: "I have a question",
      })
    ).toThrowError("This is not a valid email");
  });

  test("DuplicateEmailThrowsError", async () => {
    const body = {
      firstName: "Don't delete me",
      lastName: "Don't delete me",
      universityEmail: "donaldduck@gmail.com",
      phoneNumber: "1234567890",
      university: "University of Waterloo",
      universityAddress: "123 University Ave",
      leadershipExperience: "I have lots of leadership experience",
      motivation: "I am very motivated",
      availabilities: "I am available",
      questions: "I have a question",
    };
    const response = await fetch("http://localhost:3000/api/chapter-request", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const chapterRequestResponse = ChapterRequestResponse.parse(
      await response.json()
    );
    expect(chapterRequestResponse.code === "DUPLICATE_EMAIL").toBe(true);
  });
});

// TODO: Create tests to validate unique email for chapter requests
