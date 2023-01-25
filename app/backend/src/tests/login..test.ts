import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota de login', () => {
  const userData = {
    email: 'user@user.com',
    password: 'secret_user'
  }

  it('retorna erro 400 ao receber email vazio', async () => {
    const result = await chai.request(app).post('/login').send({ ...userData, email: undefined})
    expect(result.status).to.be.equal(400);
    expect(result.body.message).to.be.equal('All fields must be filled');
  });

  it('retorna erro 400 ao receber senha vazia', async () => {
    const result = await chai.request(app).post('/login').send({ ...userData, password: undefined})
    expect(result.status).to.be.equal(400);
    expect(result.body.message).to.be.equal('All fields must be filled');
  });

  it('retorna erro 401 ao receber email inexistente no banco de dados', async () => {
    const result = await chai.request(app).post('/login').send({ ...userData, email: 'email@email.com'})
    expect(result.status).to.be.equal(401);
    expect(result.body.message).to.be.equal('Incorrect email or password');
  });

  it('retorna erro 401 ao receber senha incorreta', async () => {
    const result = await chai.request(app).post('/login').send({ ...userData, password: 'undefined'})
    expect(result.status).to.be.equal(401);
    expect(result.body.message).to.be.equal('Incorrect email or password');
  });

  it('retorna status 200 ao receber dados válidos', async () => {
    const userMock = {
      id: 1,
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
      username: 'user',
      role: 'user'
    }

    sinon.stub(User, 'findOne').resolves(userMock as unknown as User)
    const result = await chai.request(app).post('/login').send({ ...userData })
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.property('token');
  });

});

