import { expect, test } from "@playwright/test";

import { environment } from "../../config/environments";

interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

test.describe("API response checks", { tag: "@api" }, () => {
  test(
    "should return a successful API response",
    { tag: ["@smoke", "@regression"] },
    async ({ request }) => {
      const response = await request.get(`${environment.apiBaseUrl}/posts/1`);

      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
      expect(response.headers()["content-type"]).toContain("application/json");

      const responseBody = (await response.json()) as PostResponse;

      expect(responseBody).toMatchObject({
        userId: 1,
        id: 1,
      });

      expect(responseBody.title).toEqual(expect.any(String));
      expect(responseBody.body).toEqual(expect.any(String));
    },
  );
});
