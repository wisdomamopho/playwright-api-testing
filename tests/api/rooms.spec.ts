import { test, expect } from '@playwright/test';
import { newRoom, updatedRoom } from '../utils/data';
import { ApiClient } from '../utils/common';


const mockRooms = [newRoom];
const mockUpdatedRoom = [updatedRoom];

test.describe('Rooms API', () => {

let apiClient: ApiClient;

  test.beforeAll(async () => {
    apiClient = new ApiClient('http://localhost:3000');
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
  });

  test('Delete existing room', async () => {
    await apiClient.initIfNeeded();
    const roomId: number = await apiClient.getFirstRoomId(); 
    const response = await apiClient.deleteRoom(roomId);
    expect(response.status()).toBe(200);
  });
});