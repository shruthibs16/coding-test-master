const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pet data', () => {
  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
      age: '25',
      color: 'brown',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('should create a pet with given pet data', async () => {
    const petData = {
      name: 'puppy',
      age: 24,
      color: 'white',
    };
    const res = await request(app).post('/pets').send(petData);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(petData.name);
    expect(res.body.age).to.equal(petData.age);
    expect(res.body.color).to.equal(petData.color);
  });

  it('get Pets data', async () => {
    const res = await request(app).get('/pets');
    expect(res.status).to.equal(200);
  });

  it('Delete a pet ', async() => {
    const res = await request(app).delete('/pets/puppy');
    expect(res.status).to.equal(200);
});

});