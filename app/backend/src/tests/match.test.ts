import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';
import User from '../database/models/user';

import { Response } from 'superagent';
import {
  getMatchesInProgressFalseMock,
  getMatchesInProgressTrueMock,
  getMatchesMock,
  getOneMatch,
  postMatchMock,
  updateInProgressMock,
} from './mocks/match.mock';

import { loginSuccessful } from './mocks/login.mock';

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

  describe('Adicionando partida', () => {
    describe('Passando todos os dados corretamente', () => {
      before(async () => {
        sinon
        .stub(Match, "create")
        .resolves(postMatchMock as any);

        sinon
        .stub(User, "findOne")
        .resolves(loginSuccessful as User);
      });
        
  
      after(async () => {
        (Match.create as sinon.SinonStub).restore(),
        (User.findOne as sinon.SinonStub).restore() 
      });

      it('Testando se é possível adicionar um usuário sem problemas', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
        });

        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', chaiHttpResponse.body.token)
          .send({
            homeTeam: 16,
            awayTeam: 8,
            homeTeamGoals: 2,
            awayTeamGoals: 2
          });
        
        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.be.an('object');
        expect(chaiHttpResponse.body.id).to.be.exist;
        expect(chaiHttpResponse.body.homeTeam).to.be.exist;
        expect(chaiHttpResponse.body.awayTeam).to.be.exist;
        expect(chaiHttpResponse.body.homeTeamGoals).to.be.exist;
        expect(chaiHttpResponse.body.awayTeamGoals).to.be.exist;
        expect(chaiHttpResponse.body.inProgress).to.be.exist;
      });
    });

    describe('Faltando alguns dados', () => {
      before(async () => {
        sinon
          .stub(User, "findOne")
          .resolves(loginSuccessful as User);
      });
  
      after(()=>{ (User.findOne as sinon.SinonStub).restore() });

      it('Testando se não é possível adicionar um usuário sem o homeTeam', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'admin@admin.com',
            password: 'secret_admin'
          });
  
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', chaiHttpResponse.body.token)
          .send({
            awayTeam: 8,
            homeTeamGoals: 2,
            awayTeamGoals: 2
          });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be
          .include({ 'message': 'All fields must be filled' }); 
      });
  
      it('Testando se não é possível adicionar um usuário sem o awayTeam', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'admin@admin.com',
            password: 'secret_admin'
          });
  
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', chaiHttpResponse.body.token)
          .send({
            homeTeam: 16,
            homeTeamGoals: 2,
            awayTeamGoals: 2
          });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be
          .include({ 'message': 'All fields must be filled' }); 
      });
  
      it('Testando se não é possível adicionar um usuário sem o homeTeamGoals', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'admin@admin.com',
            password: 'secret_admin'
          });
  
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', chaiHttpResponse.body.token)
          .send({
            homeTeam: 16,
            awayTeam: 8,
            awayTeamGoals: 2
          });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be
          .include({ 'message': 'All fields must be filled' }); 
      });
  
      it('Testando se não é possível adicionar um usuário sem o awayTeamGoals', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'admin@admin.com',
            password: 'secret_admin'
          });

        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('authorization', chaiHttpResponse.body.token)
          .send({
            homeTeam: 16,
            awayTeam: 8,
            homeTeamGoals: 2,
          });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be
          .include({ 'message': 'All fields must be filled' }); 
      });
    });
  });

  describe('Alterando status da partida', () => {
    describe('Se passar um id válido', () => {
      before(async () => {
        sinon
          .stub(Match, "update")
          .resolves(updateInProgressMock as any);
  
        sinon
        .stub(Match, "findOne")
        .resolves(getOneMatch as any);
      });
  
      after(async () => {
        (Match.update as sinon.SinonStub).restore(),
        (Match.findOne as sinon.SinonStub).restore()
      });

      it('Testando se é possível alterar sem problemas', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1/finish')

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be
          .include({ 'message': 'Finished' });
      });
    });

    describe('Passando id inválido', () => {
      before(async () => {
        sinon
          .stub(Match, "update")
          .resolves(updateInProgressMock as any);

        sinon
        .stub(Match, "findOne")
        .resolves(undefined);
      });

      after(async () => {
        (Match.update as sinon.SinonStub).restore(),
        (Match.findOne as sinon.SinonStub).restore()
      });

      it('Testando se não é possível alterar com um id inexistente', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/99999999/finish')

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be
          .include({ 'message': 'The match does not exist' });
      });
    });
  });
});
