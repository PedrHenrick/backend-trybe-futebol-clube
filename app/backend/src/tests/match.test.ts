import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

import { Response } from 'superagent';
import { getMatchesMock } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /Match', () => {
  let chaiHttpResponse: Response;

  describe('Tesstando função getAll', () => {    
    before(async () => sinon
      .stub(Match, "findAll")
      .resolves(getMatchesMock as any));

    after(()=>{ (Match.findAll as sinon.SinonStub).restore() });
    
    it('Testando se é possível retornar todos dados', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.be.an('object');
      expect(chaiHttpResponse.body[0].teamHome).to.be.exist;
      expect(chaiHttpResponse.body[0].teamAway).to.be.exist;
    });
  });
});