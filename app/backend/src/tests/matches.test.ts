import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota de partidas', () => {

  it('retorna status 200 ao requerer todas as partidas', async () => {
    const result = await chai.request(app).get('/matches');
    expect(result.status).to.be.equal(200);
  });

  it('retorna status 200 ao requerer todas as partidas em progresso', async () => {
    const result = await chai.request(app).get('/matches?inProgress=true');
    expect(result.status).to.be.equal(200);
  });

  it('retorna status 200 ao requerer todas as partidas finalizadas', async () => {
    const result = await chai.request(app).get('/matches?inProgress=false');
    expect(result.status).to.be.equal(200);
  });
});
