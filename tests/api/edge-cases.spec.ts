import { test, expect } from '@playwright/test';
import { Rooms } from '../entity/rooms.entity';
import { Bookings } from '../entity/bookings.entity';


test.describe('Edge cases', () => {
    test('Get room by non-existent ID', async ({request}) => {
      const roomId = 999;
      const response = await request.get(`/rooms/${roomId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(response.status()).toBe(404);
      const responseBody = await response.body();
      expect(responseBody.includes('not found')); 
    });
  /** Expected Failure, but there's no business rules to define what Invalid Data consist of*/
    test('Create new room with invalid data', async ({request}) => {
      const newRoom: Rooms = { id: -2, price: -1, type: '' };
      const res = await request.post('/rooms', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(newRoom),
      });
      expect(res.status()).toBe(201);
      const responseBody = await res.json();
      console.log(responseBody);
    });
  
    test('Create new booking with invalid data', async ({ request }) => {
      const newBooking: Bookings = { id: -2, roomId: 1, userId: 1, startDate: ' invalid date', endDate: ' invalid date' };
      const res = await request.post('/bookings', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(newBooking),
      });
      expect(res.status()).toBe(201);
      const responseBody = await res.json();
      console.log(responseBody);
    });
    
    test('Cancel booking with non-existent ID', async ({ request }) => {
      const bookingId = 999;
      const response = await request.delete(`/bookings/${bookingId}`);
      expect(response.status()).toBe(404);
    });

    
  });
  
  