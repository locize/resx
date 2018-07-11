const expect = require('expect.js');
const fixtures = require('./fixtures');

function test(what, t) {
  describe(what, () => {
    it('index', t(require('../')[what]));
    it('direct', t(require('../' + what)));
  });
}

test('resx2js', (fn) => (done) => {
  fn(fixtures.example.resx, (err, res) => {
    expect(err).not.to.be.ok();
    expect(res).to.eql(fixtures.example.js);
    done();
  });
});

test('js2resx', (fn) => (done) => {
  fn(fixtures.example.js, (err, res) => {
    expect(err).not.to.be.ok();
    expect(res).to.eql(fixtures.example.resx);
    done();
  });
});

describe('with comment', () => {

  test('resx2js', (fn) => (done) => {
    fn(fixtures.example_comment.resx, true, (err, res) => {
      expect(err).not.to.be.ok();
      expect(res).to.eql(fixtures.example_comment.js);
      done();
    });
  });

  test('js2resx', (fn) => (done) => {
    fn(fixtures.example_comment.js, (err, res) => {
      expect(err).not.to.be.ok();
      expect(res).to.eql(fixtures.example_comment.resx);
      done();
    });
  });

});
