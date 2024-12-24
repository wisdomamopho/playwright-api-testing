export class Bookings {
    id: number;
    roomId: number;
    userId: number;
    startDate: string;
    endDate: string;
  
    /**
     * Creates a new booking
     * @param id The ID of the booking
     * @param roomId The ID of the room being booked
     * @param userId The ID of the user making the booking
     * @param startDate The start date of the booking
     * @param endDate The end date of the booking
     */
    constructor(id: number, roomId: number, userId: number, startDate: string, endDate: string) {
      this.id = id;
      this.roomId = roomId;
      this.userId = userId;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }