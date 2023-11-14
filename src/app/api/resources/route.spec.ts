import { describe, expect, test } from "vitest";
import { resourceSchema } from "./route.schema";

describe("TestBatchCreateRequestSchema", () => {
  test("ValidResource", () => {
    expect(
      resourceSchema.parse({
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
      resourceSchema.parse({
        link: "https://google.com",
        title: "Hello world",
        access: ["USER", "USER"],
      })
    ).toThrowError("Duplicated roles");
  });
});
