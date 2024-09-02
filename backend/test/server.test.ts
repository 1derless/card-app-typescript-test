import { server } from "../src/server"
import Prisma from "../src/db";

describe("test run of server functions", () => {
  it("GET /get/ returns an array of entries", async () => {
    const getResponse = await server.inject({
      method: 'GET',
      url: '/get/'
    });
    expect(getResponse.statusCode).toEqual(200);
    expect(JSON.parse(getResponse.payload)).toBeInstanceOf(Array);
  });

  it("can create and delete a card", async () => {
    // Create a new card on backend
    const newEntry = {
      title: 'Test title 123',
      description: 'This card was created as part of a test',
      created_at: new Date('2024-01-01').toISOString(),
      scheduled_at: new Date('2024-01-02').toISOString()
    };
    const createResponse = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: newEntry,
    });
    expect(createResponse.statusCode).toEqual(200);
    const createPayload = JSON.parse(createResponse.payload);
    expect(createPayload).toHaveProperty("id");
    const id = createPayload['id'];

    // Check it's still there
    const getResponse = await server.inject({
      method: 'GET',
      url: '/get/' + id,
    });
    expect(getResponse.statusCode).toEqual(200);
    expect(JSON.parse(getResponse.payload)).toEqual({ ...newEntry, id });

    // Check it shows up in full listing
    const getAllResponse = await server.inject({
      method: 'GET',
      url: '/get/'
    });
    expect(getAllResponse.statusCode).toEqual(200);
    const allCards = (JSON.parse(getAllResponse.payload));
    expect(allCards).toBeInstanceOf(Array);
    expect(allCards).toContainEqual(expect.objectContaining({ id }));

    // Delete it
    const deleteResponse = await server.inject({
      method: 'DELETE',
      url: '/delete/' + id,
    });
    expect(deleteResponse.statusCode).toEqual(200);

    // Check it has actually been removed
    const getResponse2 = await server.inject({
      method: 'GET',
      url: '/get/' + id,
    });
    expect(getResponse2.statusCode).toEqual(500);

    // Check it also no longer shows up in full listing
    const getAllResponse2 = await server.inject({
      method: 'GET',
      url: '/get/'
    });
    expect(getAllResponse2.statusCode).toEqual(200);
    const allCards2 = (JSON.parse(getAllResponse2.payload));
    expect(allCards2).toBeInstanceOf(Array);
    expect(allCards2).not.toContainEqual(expect.objectContaining({ id }));
  });
});
