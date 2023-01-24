import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

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

  // it('retorna status 200 ao receber dados válidos', async () => {
  //   // sinon.stub()
  //   const result = await chai.request(app).post('/login').send({ ...userData })
  //   expect(result.status).to.be.equal(200);
  //   // expect(result.).to.be.equal('ok');
  // });

});

// describe('Rota de validação em login', () => {
//   const authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

//   it('retorna erro 401 ao receber token inválido', async () => {
//     const result = await (await chai.request(app).get('/login')).header('1')
//     expect(result.status).to.be.equal(401);
//     expect(result.body.message).to.be.equal('Unauthorized user');
//   });

  // it('retorna erro 400 ao receber senha vazia', async () => {
  //   const result = await chai.request(app).post('/login').send({ ...userData, password: undefined})
  //   expect(result.status).to.be.equal(400);
  //   expect(result.body.message).to.be.equal('All fields must be filled');
  // });

  // it('retorna erro 401 ao receber email inexistente no banco de dados', async () => {
  //   const result = await chai.request(app).post('/login').send({ ...userData, email: 'email@email.com'})
  //   expect(result.status).to.be.equal(401);
  //   expect(result.body.message).to.be.equal('Incorrect email or password');
  // });

  // it('retorna erro 401 ao receber senha incorreta', async () => {
  //   const result = await chai.request(app).post('/login').send({ ...userData, password: 'undefined'})
  //   expect(result.status).to.be.equal(401);
  //   expect(result.body.message).to.be.equal('Incorrect email or password');
  // });

  // it('retorna status 200 ao receber dados válidos', async () => {
  //   // sinon.stub()
  //   const result = await chai.request(app).post('/login').send({ ...userData })
  //   expect(result.status).to.be.equal(200);
  //   // expect(result.).to.be.equal('ok');
  // });

// });
