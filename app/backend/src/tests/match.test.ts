import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';

import { Response } from 'superagent';
import { getMatchesInProgressFalseMock, getMatchesInProgressTrueMock, getMatchesMock } from './mocks/match.mock';

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
      expect(chaiHttpResponse.body).to.be.length(48);
    });
  });

  describe('Testando com query inProgress=true', () => {    
    before(async () => sinon
      .stub(Match, "findAll")
      .resolves(getMatchesInProgressTrueMock as any));

    after(()=>{ (Match.findAll as sinon.SinonStub).restore() });
    
    it('Testando quando passamos o inProgress=true', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.be.an('object');
      expect(chaiHttpResponse.body[0].teamHome).to.be.exist;
      expect(chaiHttpResponse.body[0].teamAway).to.be.exist;
      expect(chaiHttpResponse.body).to.be.length(8);
    });
  });

  describe('Testando com query inProgress=false', () => {    
    before(async () => sinon
      .stub(Match, "findAll")
      .resolves(getMatchesInProgressFalseMock as any));

    after(()=>{ (Match.findAll as sinon.SinonStub).restore() });
    
    it('Testando quando passamos o inProgress=false', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.be.an('object');
      expect(chaiHttpResponse.body[0].teamHome).to.be.exist;
      expect(chaiHttpResponse.body[0].teamAway).to.be.exist;
      expect(chaiHttpResponse.body).to.be.length(40);
    });
  });
});
