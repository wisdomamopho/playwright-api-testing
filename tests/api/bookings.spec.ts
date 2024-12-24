import { test, expect } from '@playwright/test';
import { Bookings } from '../entity/bookings.entity';

test.describe('Bookings API', () => {
    test('Get all bookings', async ({request}) => {
      const response = await request.get('/bookings');
      expect(response.status()).toBe(200);
      expect(response.json()).resolves.toBeInstanceOf(Array);
    });
  
    test('Get booking by ID', async ({request}) => {
      const bookingId = 1;
      const response = await request.get(`/bookings/${bookingId}`);
      expect(response.status()).toBe(200);
      expect(response.json()).resolves.toBeInstanceOf(Object);
    });
  
    test('Create new booking', async ({request}) => {
      const newBooking: Bookings = { id: 2, roomId: 1, userId: 1, startDate: '2022-01-05', endDate: '2022-01-06' };
      const response = await request.post('/bookings', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(newBooking),
      });
      expect(response.status()).toBe(201);
      const createdBookingResponse = await response.json();
      expect(createdBookingResponse.id).toEqual(newBooking.id);
      expect(createdBookingResponse.startDate).toEqual(newBooking.startDate);
    });
  
    test('Update and Delete an existing booking', async ({request}) => {
      const bookingId = 2;

      await test.step("Update the Start date of an existing booking", async () =>{
        const updatedBooking: Bookings = { id: bookingId, roomId: 1, userId: 1, startDate: '2022-01-07', endDate: '2022-01-08' };
        const response = await request.put(`/bookings/${bookingId}`, {
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(updatedBooking),
        });
        expect(response.status()).toBeTruthy();
        const startDateResponse = await response.json().then((data) => data.startDate);
        expect(startDateResponse).toEqual(updatedBooking.startDate);
      });
      
      await test.step("Cancel booking", async () =>{
        const response = await request.delete(`/bookings/${bookingId}`);
        expect(response.status()).toBeTruthy();
      });
    });
    /** request.delete requires the server restart to work during runtime hence i've placed it as a step above
    test('Cancel booking', async ({request}) => {
      const bookingId = 2;
      const response = await request.delete(`/bookings/${bookingId}`);
      expect(response.status()).toBe(204);
    });
    */
  });
  