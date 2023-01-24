import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota de times', () => {

  it('retorna status 200 ao requerer todos os times', async () => {
    const result = await chai.request(app).get('/teams');
    expect(result.status).to.be.equal(200);
  });

});


