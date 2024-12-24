import { test, expect } from '@playwright/test';
import { newRoom, updatedRoom } from '../utils/data';
import { Rooms } from '../entity/rooms.entity';
import { ApiClient } from '../utils/common';
import { faker } from '@faker-js/faker';

const mockRooms = [newRoom];
const mockUpdatedRoom = [updatedRoom];

test.describe.serial('Rooms API', () => {
let apiClient: ApiClient;

  test.beforeAll(async () => {
    apiClient = new ApiClient('http://localhost:3000');
    
  });
  
  test('GET /posts', async () => {
    await apiClient.initIfNeeded();
    const posts = await apiClient.get('/rooms');
    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBeGreaterThan(0);
    const firstRoomId = posts[0].id;
    await apiClient.deleteRoom(firstRoomId);
  });

  test('Get all rooms - should return a list of rooms', async ({ request }) => {
    const response = await request.get(`/rooms`);
    expect(response.status()).toBe(200);

    const rooms = await response.json();
    expect(Array.isArray(rooms)).toBeTruthy();
    expect(rooms.length).toBeGreaterThan(0); // At least one room
  });

  test('Get room by ID', async () => {
    const roomId = 23;
    const response = await apiClient.get(`/rooms/${roomId}`);
    expect(response.status).toBeOK;
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('price');
    expect(response.id).toBe(roomId.toString());
         
  });

  test('Create new room', async () => {
    const newRoom = mockRooms[0];
    const addResponse = await apiClient.createNewRoom(newRoom);
    expect(addResponse).not.toBeUndefined();
    const room  = await addResponse;
    expect(room.id).toEqual(newRoom.id);
    expect(room.price).toStrictEqual(newRoom.price); 

  });

  test('Update existing room', async ({ request }) => {
    await apiClient.initIfNeeded();
    const roomId: number = await apiClient.getFirstRoomId();  // Gets a list of rooms and returns the first one's id
    const response = await request.put(`/rooms/${roomId}`,{ 
      data: JSON.stringify(mockUpdatedRoom[0]), 
      headers: { 'Content-Type': 'application/json' } 
    });
    expect(response.status()).toBe(200);
    const roomType =await response.json().then((data) => data.type)
    expect(roomType).toEqual(updatedRoom.type);
    console.log(updatedRoom);
  });

  test('Delete existing room', async () => {
    await apiClient.initIfNeeded();
    const roomId: number = await apiClient.getFirstRoomId();  // Gets a list of rooms and returns the first one's id
    const response = await apiClient.deleteRoom(roomId);
    expect(response.status()).toBe(200);
  });
});