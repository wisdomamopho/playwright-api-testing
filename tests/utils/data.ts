import { faker } from '@faker-js/faker';

const randomRoomId = faker.number.int({ min: 1, max: 100 });
interface RoomsAPI {
  id: number;
  type: string;
  price: number;
}

interface BookingsAPI {
  id: number;
  roomId: number;
  userId: number;
  startDate: string;
  endDate: string;
}

export const newRoom: RoomsAPI = { 
  id: randomRoomId, 
  type: 'Single', 
  price: 280 
};

export const updatedRoom: RoomsAPI = { 
  id: randomRoomId, 
  type: 'Double', 
  price: 120 
};

export const newBooking: BookingsAPI = { 
  id: 2, 
  roomId: 1, 
  userId: 1, 
  startDate: '2022-01-05', 
  endDate: '2022-01-06' 
};

export const updatedBooking: BookingsAPI = { 
  id: 2, 
  roomId: 1, 
  userId: 1, 
  startDate: '2022-01-07', 
  endDate: '2022-01-08' 
};

  
       