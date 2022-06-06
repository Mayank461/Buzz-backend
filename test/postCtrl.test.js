const postController = require('../controllers/post.controller');
const postService = require('../services/post.service');
const request = require('superset');
const sinon = require('sinon');

const flushPromises = () => new Promise(setImmediate);
describe('all_post block in post controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create', async () => {
    const mResult = 'success';
    sinon.stub(postService, 'allPost').resolves(mResult);
    const mReq = { body: {} };
    const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
    postController.allPost(mReq, mReply);
    await flushPromises();
    // sinon.assert.calledWith(mReply.code, 200);
    sinon.assert.calledWith(mReply.send, 'success');
  });
});

describe('like block in post controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should like on post', async () => {
    const mResult = 'success';
    sinon.stub(postService, 'inclike').resolves(mResult);
    const mReq = {
      body: { post_id: '4edd40c86762e0fb12000003' },
      user: { id: '4edd40c86762e0fb12000003' },
    };
    const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
    postController.like(mReq, mReply);
    await flushPromises();
    // sinon.assert.calledWith(mReply.code, 200);
    sinon.assert.calledWith(mReply.send, 'success');
  });
});
describe('dislike block in post controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should like on post', async () => {
    const mResult = 'success';
    sinon.stub(postService, 'dislike').resolves(mResult);
    const mReq = {
      body: { post_id: '4edd40c86762e0fb12000003' },
      user: { id: '4edd40c86762e0fb12000003' },
    };
    const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
    postController.unlike(mReq, mReply);
    await flushPromises();
    // sinon.assert.calledWith(mReply.code, 200);
    sinon.assert.calledWith(mReply.send, 'success');
  });
});

describe('comment block in post controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should like on post', async () => {
    const mResult = 'success';
    sinon.stub(postService, 'comment').resolves(mResult);
    const mReq = {
      body: {
        post_id: '4edd40c86762e0fb12000003',
        comment: { message: 'this is testing' },
      },
      user: { id: '4edd40c86762e0fb12000003' },
    };
    const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
    postController.comment(mReq, mReply);
    await flushPromises();
    // sinon.assert.calledWith(mReply.code, 200);
    sinon.assert.calledWith(mReply.send, 'success');
  });
});

// describe('comment reply block in post controller', () => {
//   afterEach(() => {
//     sinon.restore();
//   });
//   it('should like on post', async () => {
//     const mResult = 'success';
//     sinon.stub(postService, 'commentReply').resolves(mResult);
//     const mReq = {
//       body: {
//         post_id: '4edd40c86762e0fb12000003',
//         comment: { message: 'this is testing' },
//       },
//       user: { id: '4edd40c86762e0fb12000003' },
//     };
//     const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
//     postController.commentReply(mReq, mReply);
//     await flushPromises();
//     // sinon.assert.calledWith(mReply.code, 200);
//     sinon.assert.calledWith(mReply.send, 'success');
//   });
// });

describe('comment like block in post controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should like on post', async () => {
    const mResult = 'success';
    sinon.stub(postService, 'inclike').resolves(mResult);
    const mReq = {
      body: {
        post_id: '4edd40c86762e0fb12000003',
        comment: { message: 'this is testing' },
      },
      user: { id: '4edd40c86762e0fb12000003' },
    };
    const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
    postController.like(mReq, mReply);
    await flushPromises();
    // sinon.assert.calledWith(mReply.code, 200);
    sinon.assert.calledWith(mReply.send, 'success');
  });
});

describe('report block in post controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should like on post', async () => {
    const mResult = { status: 200 };
    sinon.stub(postService, 'report').resolves(mResult);
    const mReq = {
      body: { post_id: '4edd40c86762e0fb12000003' },
      user: { id: '4edd40c86762e0fb12000003' },
    };
    const mReply = {
      code: sinon.stub().returnsThis(),
      sendStatus: sinon.stub(),
    };
    postController.report(mReq, mReply);
    await flushPromises();
    // sinon.assert.calledWith(mReply.code, 200);
    sinon.assert.calledWith(mReply.sendStatus, 200);
  });
});

describe('delete report block in post controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should like on post', async () => {
    const mResult = { status: 200 };
    sinon.stub(postService, 'delReport').resolves(mResult);
    const mReq = {
      body: { post_id: '4edd40c86762e0fb12000003' },
      user: { id: '4edd40c86762e0fb12000003' },
    };
    const mReply = {
      code: sinon.stub().returnsThis(),
      sendStatus: sinon.stub(),
    };
    postController.delReport(mReq, mReply);
    await flushPromises();
    // sinon.assert.calledWith(mReply.code, 200);
    sinon.assert.calledWith(mReply.sendStatus, 200);
  });
});

describe('update post report block in post controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should like on post', async () => {
    const mResult = { status: 200 };
    sinon.stub(postService, 'updatePost').resolves(mResult);
    const mReq = {
      body: { post_id: '4edd40c86762e0fb12000003' },
      user: { id: '4edd40c86762e0fb12000003' },
    };
    const mReply = {
      code: sinon.stub().returnsThis(),
      sendStatus: sinon.stub(),
    };
    postController.updatePost(mReq, mReply);
    await flushPromises();
    // sinon.assert.calledWith(mReply.code, 200);
    sinon.assert.calledWith(mReply.sendStatus, 200);
  });
});

describe('get post report block in post controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  it('should like on post', async () => {
    const mResult = { status: 200 };
    sinon.stub(postService, 'getPost').resolves(mResult);
    const mReq = {
      body: { post_id: '4edd40c86762e0fb12000003' },
      user: { id: '4edd40c86762e0fb12000003', friends: { myFriends: '' } },
      query: { page: 2 },
    };
    const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
    postController.getPost(mReq, mReply);
    await flushPromises();
    // sinon.assert.calledWith(mReply.code, 200);
    sinon.assert.calledWith(mReply.send, { status: 200 });
  });
});
