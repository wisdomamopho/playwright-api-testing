import { request, APIRequestContext } from '@playwright/test';

export class ApiClient {
    private requestContext?: APIRequestContext;
  
    constructor(private readonly baseURL: string) {}
  
    /**
     * Initializes the API request context if it has not been initialized yet.
     * The context is reused across all requests to improve performance.
     */
    public async initIfNeeded() {
      if (!this.requestContext) {
        this.requestContext = await request.newContext({ baseURL: this.baseURL });
      }
    }
  
    /**
     * Sends a GET request to the API.
     * @param endpoint The endpoint to request, relative to the base URL.
     * @returns The JSON response from the API.
     */
    async get(endpoint: string) {
      const response = await this.requestContext!.get(endpoint);
      return response.json();
    }

    /**
     * Sends a POST request to the API.
     * @param endpoint The endpoint to request, relative to the base URL.
     * @param data The data to send in the request body.
     * @returns The JSON response from the API.
     */
  async post(endpoint: string, data: any) {
    await this.initIfNeeded();
    const response = await this.requestContext!.post(endpoint, { data });
    return response.json();
  }

  async put(endpoint: string, data: any) {
    await this.initIfNeeded();
    const response = await this.requestContext!.put(endpoint, { data });
    return response.json();
  }

  async delete(endpoint: string, data: any) {
    await this.initIfNeeded();
    const response = await this.requestContext!.delete(endpoint, { data });
    return response;
  }

    /**
     * Creates a new room with the given data.
     * @param data The data of the room to create, e.g. { id: 1, price: 280, type: 'Single' }
     * @returns The newly created room.
     */
  async createNewRoom(data: any) {
    await this.initIfNeeded();
    const response = await this.requestContext!.post('/rooms', { data });
    return response.json();
  }

  async deleteRoom(roomId: number) {
    await this.initIfNeeded();
    const response = await this.requestContext!.delete(`/rooms/${roomId}`);
     return response;
  }

    /**
     * Gets the ID of the first room in the list of all rooms.
     * @returns The ID of the first room.
     */
  async getFirstRoomId() {        
    const rooms = await this.get('/rooms');
    return rooms[0].id;
  }

}


