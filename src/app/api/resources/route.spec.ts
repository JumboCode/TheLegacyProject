import { describe, expect, test } from "vitest";
import { createResourceSchema } from "./route.schema";

describe("TestBatchCreateRequestSchema", () => {
  test("ValidResource", () => {
    expect(
      createResourceSchema.parse({
        link: "https://google.com",
        title: "Hello world",
        access: ["USER"],
      })
    ).toEqual({
      link: "https://google.com",
      title: "Hello world",
      access: ["USER"],
    });
  });

  test("InvalidResourceAccess", () => {
    expect(() =>
      createResourceSchema.parse({
        link: "https://google.com",
        title: "Hello world",
        access: ["USER", "USER"],
      })
    ).toThrowError("Duplicated roles");
  });
});
