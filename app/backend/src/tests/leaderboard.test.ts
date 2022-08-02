import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';
import Match from '../database/models/match';

import { Response } from 'superagent';
import { getTeamMock } from './mocks/team.mock';
import { getMatchesInProgressFalseMock } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /leaderboard', () => {
  let chaiHttpResponse: Response;
  describe('Testando rota /leaderboard/home', () => {
    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(getTeamMock as any);

      sinon
        .stub(Match, "findAll")
        .resolves(getMatchesInProgressFalseMock as any);
    });

    after(()=>{
      (Team.findAll as sinon.SinonStub).restore(),
      (Match.findAll as sinon.SinonStub).restore()
    });

    it('Testando se trás as informações na tabela com os times que jogaram em casa', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body[0].name).to.be.equal('Santos');
      expect(chaiHttpResponse.body[0].totalPoints).to.be.equal(9);
    });

    it('Testando se trás as informações na tabela com os times que jogaram fora de casa', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body[0].name).to.be.equal('Palmeiras');
      expect(chaiHttpResponse.body[0].totalPoints).to.be.equal(6);
    });

    it('Testando se trás as informações dos times na tabela', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body[0].name).to.be.equal('Palmeiras');
      expect(chaiHttpResponse.body[0].totalPoints).to.be.equal(13);
    });
  });
});