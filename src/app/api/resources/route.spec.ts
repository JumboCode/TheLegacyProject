import { describe, expect, test } from "vitest";
import { ResourceSchema } from "./route.schema";

describe("TestBatchCreateRequestSchema", () => {
  test("ValidResource", () => {
    expect(
      ResourceSchema.parse({
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
      ResourceSchema.parse({
        link: "https://google.com",
        title: "Hello world",
        access: ["USER", "USER"],
      })
    ).toThrowError("Duplicated roles");
  });
});
