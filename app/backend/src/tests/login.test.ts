import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import user from '../database/models/user';

import { Response } from 'superagent';
import { loginSuccessful, loginValidate } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  let chaiHttpResponse: Response;
  describe('Passando os dados corretos', () => {
    before(async () => {
      sinon
        .stub(user, "findOne")
        .resolves(loginSuccessful as user);
    });

    after(()=>{ (user.findOne as sinon.SinonStub).restore() });

    it('Testando se é possível fazer login na plataforma', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
        });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body.token).to.be.an('string');
    });
  });

  describe('Faltando dados', () => {
    it('Testando se não é possível fazer login sem o email', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: 'secret_admin'
        });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be
        .include({ 'message': 'All fields must be filled' }); 
    });

    it('Testando se não é possível fazer login sem o passsword', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
        });

        
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be
          .include({ 'message': 'All fields must be filled' }); 
    });
  });
  describe('Passando dados incorretos', () => {
    describe('Passando email incorreto', () => {
      before(async () => {
        sinon
        .stub(user, "findOne")
        .resolves(undefined);
    });

    after(()=>{ (user.findOne as sinon.SinonStub).restore() });

    it('Testando se não é possível fazer login com um email inválido', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@incorrect.com',
          password: 'secret_admin'
        });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be
          .include({ 'message': 'Incorrect email or password' });  
    });
  });

  describe('Passando password incorreto', () => {
    before(async () => {
      sinon
        .stub(user, "findOne")
        .resolves(loginSuccessful as user);
    });

    after(()=>{ (user.findOne as sinon.SinonStub).restore() });

    it('Testando se não é possível fazer login com senha incorreta', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'incorrect_secret_admin'
        });

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be
          .include({ 'message': 'Incorrect email or password' });
      });
    });
  });
});

describe('Rota /login/validate', () => {
  let chaiHttpResponse: Response;

  describe('Não passando token', () => {
    it('Testando se não é possível fazer requisição sem ter um token de autorização', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate');
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be
        .include({ 'message': 'Unauthorized' });
    });
  });

  describe('Passando token inválido', () => {
    it('Testando se não é possível fazer requisição com um token invalido', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'tokenInválido');
  
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be
          .include({ 'message': 'Invalid token' });
    });
  });

  describe('Passando token válido', () => {
    before(async () => {
      sinon
        .stub(user, "findOne")
        .resolves(loginSuccessful as user);
    });

    after(()=>{ (user.findOne as sinon.SinonStub).restore() });

    it('Testando se é possível fazer requisição com um token de autorização', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
        });

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', chaiHttpResponse.body.token);
      
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be
          .include({ 'role': 'admin' });
    });
  });
});
