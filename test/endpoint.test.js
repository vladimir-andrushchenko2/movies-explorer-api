// endpoint.test.js
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

// const request = supertest(app);

beforeAll(() => mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb'));

afterAll(() => mongoose.disconnect());

describe('Endpoints respond to requests', () => {
  const agent = supertest.agent(app);

  // it('Registers user', async () => {
  //   await agent
  //     .post('/signup')
  //     .send({
  //       email: 'test@mail.com',
  //       password: '77777777',
  //       name: 'SuperTestClient',
  //     })
  //     .then((response) => {
  //       expect(response.status).toBe(201);
  //     })
  //     .finally(() => {
  //       mongoose.disconnect();
  //     });
  // });

  it('Logins', async () => {
    const loginResponse = await agent.post('/signin').send({
      email: 'test@mail.com',
      password: '77777777',
    });

    expect(loginResponse.body).toStrictEqual({ message: 'login successfull, token is stored in cookies' });
  });

  it('Responts 200 to "/users/me"', async () => {
    const res = await agent
      .get('/users/me');
    expect(res.body.data.name === 'SuperTestClient').toBeTruthy();
  });

  it('Logout', async () => {
    const res = await agent.delete('/users/logout');
    expect(res.body).toStrictEqual({
      message: 'the jwt cookie is the killedest guy in the room',
    });
  });
});
