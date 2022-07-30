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

  before(async () => {
    sinon
      .stub(user, "findOne")
      .resolves(loginSuccessful as user);
  });

  after(()=>{
    (user.findOne as sinon.SinonStub).restore();
  });

  it('Testando se é possível fazer login na plataforma', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'senhaDeTesteCorreta'
      });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body.token).to.be.an('string');
  });

  it('Testando se não é possível fazer login sem o email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        password: 'senhaDeTesteCorreta'
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
        email: 'teste@teste.com',
      });

      
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be
        .include({ 'message': 'All fields must be filled' }); 
  });

  it('Testando se não é possível fazer login com um email inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'teste@.com',
        password: 'senhaDeTesteCorreta'
      });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be
      .include('Incorrect email or password');  
  });

  it('Testando se não é possível fazer login com senha incorreta', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'senhaDeTesteIncorreta'
      });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be
      .include('Incorrect email or password');
  });
});

describe('Rota /login/validate', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(user, "findOne")
      .resolves(loginValidate as user);
  });

  after(()=>{
    (user.findOne as sinon.SinonStub).restore();
  });

  it('Testando se não é possível fazer requisição sem ter um token de autorização', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', '');

    expect(chaiHttpResponse.error.status).to.be.equal(401);
    expect(chaiHttpResponse.error.message).to.be
      .include('Unauthorized');
  });

  it('Testando se não é possível fazer requisição sem ter um token de autorização', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', 'token');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body.role).to.be.true;
  });
});
