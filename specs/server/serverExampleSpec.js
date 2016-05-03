// Example Server test:
const request = require('supertest');
const should = require('should');

describe('loading express', () => {
  let server;
  beforeEach(() => {
    /* eslint-disable */
    server = require('../../server/server.js');
    /* eslint-enable */
  });

  it('response to /', (done) => {
    request(server)
      .get('/')
      .expect(200)
      .end(done);
  });
});

describe('Testing unauthorized API attempts', () => {
  let server;

  beforeEach(() => {
    /* eslint-disable */
    server = require('../../server/server.js');
    /* eslint-enable */
  });

  it('should respond with 302 (redirect) if authentication fails', (done) => {
    request(server)
      .get('/api/user')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(302);
        done();
      });
  });

  it('should redirect to "/api/auth" if authentication fails', (done) => {
    request(server)
      .get('/api/user')
      .expect(302)
      .end((err, res) => {
        should.not.exist(err);
        res.header.location.should.be.equal('/api/auth');
        done();
      });
  });

  it('response to /api/auth', (done) => {
    request(server)
      .get('/api/auth')
      .expect(404)
      .end(done);
  });
});


describe('Testing authorized endpoint HTTP response types', () => {
  const passportStub = require('passport-stub-js');
  let server;
  beforeEach(() => {
    /* eslint-disable */
    server = require('../../server/server.js');
    /* eslint-enable */
    passportStub.install(server);
    passportStub.login({ username: 'john.doe' });
  });

  it('should repond with 200 when logged in', (done) => {
    request(server)
      .get('/api/user')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.be.equal(200);
        done();
      });
  });

  it('response to GET /api/coveys', (done) => {
    request(server)
      .get('/api/coveys')
      .expect(200)
      .end(done);
  });

  it('response to POST /api/coveys', (done) => {
    request(server)
      .post('/api/coveys')
      .expect(201)
      .end(done);
  });

  it('response to DELETE /api/coveys/:id', (done) => {
    request(server)
      .del('/api/coveys/4')
      .expect(200)
      .end(done);
  });

  it('response to PUT /api/coveys/:id', (done) => {
    request(server)
      .put('/api/coveys/4')
      .expect(200)
      .end(done);
  });

  it('response to GET /api/coveys/:id', (done) => {
    request(server)
      .get('/api/coveys/4')
      .expect(200)
      .end(done);
  });

  it('response to POST /api/signup', (done) => {
    request(server)
      .get('/api/signup')
      .expect(404)
      .end(done);
  });
});

describe('Testing user signup api /api/signup', () => {
  // const server = require('../../server/server.js');
  let server;
  let userId;
  const newUser = JSON.stringify({ email: 'fools@me.com',
    facebookId: 'wastedId4',
    firstName: 'Spider',
    lastName: 'Monkey',
    gender: 'male',
    photoUrl: 'http://something.com/nope.jpg',
  });

  beforeEach(() => {
    /* eslint-disable */
    server = require('../../server/server.js');
    /* eslint-enable */
  });

  it('response to /api/auth with no data', (done) => {
    request(server)
      .post('/api/signup')
      .type('json')
      .send({ name: 'foo' })  // without a facebookId field, this will fail
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
        } else if (res) {
          done();
        }
      });
  });

  it('response to /api/auth with new user data', (done) => {
    request(server)
      .post('/api/signup')
      .type('json')
      .send(newUser)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201)
      .end((err, res) => {
    // Calling the end function will send the request
    // errs are generated from the expect statements and passed to end as the first argument
        if (err) {
          done(err);
        } else if (res) {
          userId = JSON.stringify({ userId: res.body.id });
          done();
        }
      });
  });

  it('response to /api/removeuser with userId should delete the user', (done) => {
    request(server)
      .del('/api/removeuser')
      .type('json')
      .send(userId)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else if (res) {
          done();
        }
      });
  });
});
