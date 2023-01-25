import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Match from '../database/models/Match';
import { matchesMock } from './mocks/matches.mocks';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota de partidas', () => {
  // sinon.stub(Match, 'findAll').resolves(matchesMock as unknown as Match[])

  it('retorna status 200 ao requerer todas as partidas', async () => {
    const result = await chai.request(app).get('/matches');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.length(48);
  });

  it('retorna status 200 ao requerer todas as partidas em progresso', async () => {
    const result = await chai.request(app).get('/matches?inProgress=true');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.length(8);
  });

  it('retorna status 200 ao requerer todas as partidas finalizadas', async () => {
    const result = await chai.request(app).get('/matches?inProgress=false');
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.length(40);
  });

  it('retorna status 201 ao adicionar uma partida em progresso', async () => {
    const successfulResponse = {
      dataValues: {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 8,
        "awayTeamGoals": 2,
        "inProgress": true,
      }
    }
    
    const matchDataMock = {
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }


  sinon.stub(Match, 'create').resolves(successfulResponse as unknown as Match)


  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsImlhdCI6MTY3NDY3NTAwMCwiZXhwIjoxNjc1NTM5MDAwfQ.imflKq4ZZmKurRaoqhqWcVLBO-sUHqMQMhKYK28hLjM";


    const result =  await chai.request(app).post('/matches').set({Authorization: token}).send(matchDataMock);
    expect(result.status).to.be.equal(201);
    expect(result.body).to.be.deep.equal(successfulResponse.dataValues);
  });

  // it('retorna status 201 ao adicionar uma partida em progresso', async () => {
  //   const matchDataMock = {
  //     "homeTeamId": 100,
  //     "awayTeamId": 8,
  //     "homeTeamGoals": 2,
  //     "awayTeamGoals": 2,
  //   }
  //   const result = await chai.request(app).post('/matches').send(matchDataMock);
  //   expect(result.status).to.be.equal(201);
  //   expect(result.body).to.be.equal({ message: 'There is no team with such id!' });

  // });


});
