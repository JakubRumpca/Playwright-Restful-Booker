const { test, expect } = require('@playwright/test');
require('dotenv').config();

let token;
let bookingId;

test.beforeAll(async ({ request }) => {
  const response = await request.post("/auth", {
    data: {
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  token = responseBody.token;
});

test('GET Request: Get all the booking details', async ({ request }) => {
  const response = await request.get("/booking");
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test("POST Request: Create New Booking ", async ({ request }) => {
  const response = await request.post("/booking", {
    data: {
      firstname: "John",
      lastname: "Wick",
      totalprice: 1000,
      depositpaid: false,
      bookingdates: {
        checkin: "2024-07-01",
        checkout: "2024-07-15",
      },
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  bookingId = responseBody.bookingid;
  expect(responseBody.booking).toHaveProperty("totalprice", 1000);
  expect(responseBody.booking).toHaveProperty("firstname", "John");
  expect(responseBody.booking).toHaveProperty("lastname", "Wick");
  expect(responseBody.booking).toHaveProperty("depositpaid", false);
  expect(responseBody.booking.bookingdates).toHaveProperty("checkin", '2024-07-01');
  expect(responseBody.booking.bookingdates).toHaveProperty("checkout", '2024-07-15');
});

test("PUT Request: Update the booking details", async ({ request }) => {
  const response = await request.put(`/booking/${bookingId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: `token=${token}`,
    },
    data: {
      firstname: "John",
      lastname: "Wick",
      totalprice: 1200,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-07-01",
        checkout: "2024-07-15",
      },
      additionalneeds: "Breakfast",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("totalprice", 1200);
  expect(responseBody).toHaveProperty("depositpaid", true);
  expect(responseBody).toHaveProperty("additionalneeds", 'Breakfast');
});

test("PATCH Request: Update the booking details", async ({ request }) => {
  const response = await request.patch(`/booking/${bookingId}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: `token=${token}`,
    },
    data: {
      bookingdates: {
        checkin: "2024-07-16",
        checkout: "2024-07-30",
      },
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.bookingdates).toHaveProperty("checkin", '2024-07-16');
  expect(responseBody.bookingdates).toHaveProperty("checkout", '2024-07-30');
});

test(`GET Request: Get details of the created booking after modifications: ${bookingId}`, async ({ request }) => {
  const response = await request.get(`/booking/${bookingId}`);
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("totalprice", 1200);
  expect(responseBody).toHaveProperty("firstname", "John");
  expect(responseBody).toHaveProperty("lastname", "Wick");
  expect(responseBody).toHaveProperty("depositpaid", true);
  expect(responseBody).toHaveProperty("additionalneeds", 'Breakfast');
  expect(responseBody.bookingdates).toHaveProperty("checkin", '2024-07-16');
  expect(responseBody.bookingdates).toHaveProperty("checkout", '2024-07-30');
});

test("DELETE Request: Delete the booking", async ({ request }) => {
  const response = await request.delete(`/booking/${bookingId}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
});
