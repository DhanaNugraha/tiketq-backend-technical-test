import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Root', () => {
    it('GET / should return 404 for root endpoint', () => {
      return request(httpServer)
        .get('/')
        .expect(404);
    });
  });

  describe('Tickets', () => {
    const testTicket = {
      eventName: 'Test Event',
      location: 'Test Location',
      time: '2025-12-31T20:00:00.000Z',
    };
    let createdTicketId: string;

    it('POST /tickets should create a ticket', async () => {
      const response = await request(httpServer)
        .post('/tickets')
        .send(testTicket)
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body.eventName).toBe(testTicket.eventName);
      createdTicketId = response.body.id;
    });

    it('GET /tickets should return all tickets', async () => {
      const response = await request(httpServer)
        .get('/tickets')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /tickets/:id should return a specific ticket', async () => {
      const response = await request(httpServer)
        .get(`/tickets/${createdTicketId}`)
        .expect(200);
      
      expect(response.body.id).toBe(createdTicketId);
      expect(response.body.eventName).toBe(testTicket.eventName);
    });

    it('PATCH /tickets/:id should update a ticket', async () => {
      const updateData = { location: 'Updated Location' };
      const response = await request(httpServer)
        .patch(`/tickets/${createdTicketId}`)
        .send(updateData)
        .expect(200);
      
      expect(response.body.location).toBe(updateData.location);
    });

    it('DELETE /tickets/:id should delete a ticket', async () => {
      await request(httpServer)
        .delete(`/tickets/${createdTicketId}`)
        .expect(200);
      
      // Verify the ticket was deleted
      await request(httpServer)
        .get(`/tickets/${createdTicketId}`)
        .expect(404);
    });
  });
});
