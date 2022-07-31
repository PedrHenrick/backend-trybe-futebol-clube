import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import team from '../database/models/team';

import { Response } from 'superagent';
import { getOneTeamMock, getTeamMock } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /Team', () => {
  let chaiHttpResponse: Response;

  describe('Tesstando função getAll', () => {    
    before(async () => sinon
      .stub(team, "findAll")
      .resolves(getTeamMock as any));

    after(()=>{ (team.findAll as sinon.SinonStub).restore() });
    
    it('Testando se é possível retornar todos dados', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.body[0]).to.be.an('object');
      expect(chaiHttpResponse.body[0].id).to.be.equal(1);
      expect(chaiHttpResponse.body[0].teamName).to.be.equal('Avaí/Kindermann');
    });
  });

  describe('Testando função getOne', () => {
    before(async () => {
      sinon
        .stub(team, "findOne")
        .resolves(getOneTeamMock as any);
    });

    after(()=>{ (team.findOne as sinon.SinonStub).restore() });

    it('Testando se é possível retornar apenas um dado', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams/5')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body.id).to.be.equal(1);
      expect(chaiHttpResponse.body.teamName).to.be.equal('Avaí/Kindermann');
    });
  });
});
