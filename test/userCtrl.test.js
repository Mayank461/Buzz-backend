const userController = require('../controllers/user.controller');
const userService = require('../services/user.service');
const request = require('superset');
const sinon = require('sinon');

const flushPromises = () => new Promise(setImmediate);
describe('get all_posts block in post controller', () => {
    afterEach(() => {
        sinon.restore();
      });

      it('should create', async () => {
        const mResult = 'success';
        sinon.stub(userService, 'getAll').resolves(mResult);
        const mReq = { body: {} };
        const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
        userController.getAll(mReq, mReply);
        await flushPromises();
        // sinon.assert.calledWith(mReply.code, 200);
        sinon.assert.calledWith(mReply.send, 'success');
      });
    
});

describe('get user block in post controller', () => {
    afterEach(() => {
        sinon.restore();
      });

      it('should create', async () => {
        const mResult = 'success';
        sinon.stub(userService, 'getSpecificUser').resolves(mResult);
        const mReq = { body: {} ,params:{id:"4edd40c86762e0fb12000003"}};
        const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
        userController.getUser(mReq, mReply);
        await flushPromises();
        // sinon.assert.calledWith(mReply.code, 200);
        sinon.assert.calledWith(mReply.send, 'success');
      });
    
});

describe('send request block in post controller', () => {
    afterEach(() => {
        sinon.restore();
      });

      it('should create', async () => {
        const mResult =   { status: 200};
       sinon.stub(userService, 'sendRequest').resolves(mResult);
    
       
        const mReq = { body: {} ,user:{id:"4edd40c86762e0fb12000003"},params:{id:"4edd40c86762e0fb12000003"}};
        const mReply = {  code: sinon.stub().returnsThis(),send: sinon.stub(), sendStatus: sinon.stub() };
        userController.sendRequest(mReq, mReply);
        await flushPromises();
        sinon.assert.calledWith(mReply.sendStatus, 200);
    
      });
    
});

describe('confirm request block in post controller', () => {
  afterEach(() => {
      sinon.restore();
    });

    it('should create', async () => {
      const mResult =   { status: 200};
     sinon.stub(userService, 'confirmRequest').resolves(mResult);
  
     
      const mReq = { body: {} ,user:{id:"4edd40c86762e0fb12000003"},params:{id:"4edd40c86762e0fb12000003"}};
      const mReply = {  code: sinon.stub().returnsThis(),send: sinon.stub(), sendStatus: sinon.stub() };
      userController.confirmRequest(mReq, mReply);
      await flushPromises();
      sinon.assert.calledWith(mReply.sendStatus, 200);
  
    });
  
});

describe('delete/cancel request block in post controller', () => {
  afterEach(() => {
      sinon.restore();
    });

    it('should create', async () => {
      const mResult =   { status: 200};
     sinon.stub(userService, 'deleteOrCancelRequest').resolves(mResult);
  
     
      const mReq = { body: {} ,user:{id:"4edd40c86762e0fb12000003"},params:{id:"4edd40c86762e0fb12000003"}};
      const mReply = {  code: sinon.stub().returnsThis(),send: sinon.stub(), sendStatus: sinon.stub() };
      userController.deleteOrCancelRequest(mReq, mReply);
      await flushPromises();
      sinon.assert.calledWith(mReply.sendStatus, 200);
  
    });
  
});

describe('update profile block in post controller', () => {
    afterEach(() => {
        sinon.restore();
      });

      it('should create', async () => {
        const mResult = {status: 200};
        sinon.stub(userService, 'updateUser').resolves(mResult);
        const mReq = {body: {firstname:"dd",lastname:"d",picture_url:"d",designation:"d",website:"d",gender:"d",birthday:"d",city:"d",state:"d",zip:"d"} ,params:{id:"4edd40c86762e0fb12000003"}};
        const mReply = { code: sinon.stub().returnsThis(), sendStatus: sinon.stub() };
        userController.updateProfile(mReq, mReply);
        await flushPromises();
        sinon.assert.calledWith(mReply.sendStatus, 200);
      });
    
});

describe('suggest user block in post controller', () => {
    afterEach(() => {
        sinon.restore();
      });
      it('should create', async () => {
        const mResult = 'success';
        sinon.stub(userService, 'suggestUsers').resolves(mResult);
        const mReq = {body: {} ,user:{id:"4edd40c86762e0fb12000003"}};
        const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
        userController.suggestUsers(mReq, mReply);
        await flushPromises();
        // sinon.assert.calledWith(mReply.code, 200);
        sinon.assert.calledWith(mReply.send, 'success');
      });
    
});