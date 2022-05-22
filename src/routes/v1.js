import express from 'express';

//Controller
import UserController from '../app/controller/UserController.js';
import UserSessionController from '../app/controller/UserSessionController.js';
import TokensForChangePasswordController from '../app/controller/TokensForChangePasswordController.js';
import ArticleController from '../app/controller/ArticleController.js';

//Request
import UserRequest from '../app/request/UserRequest.js';
import SessionRequest from '../app/request/SessionRequest.js';
import ChangePasswordRequest from '../app/request/ChangPasswordRequest.js';
import ArticleRequest from '../app/request/ArticleRequest.js';

export const router = express.Router();

//Register User
router.post('/user', await UserRequest.validateStore, await UserController.store);
router.get('/user/:_id', await UserRequest.validateShow,  await UserController.show);
router.patch('/user/:_id', await UserRequest.validateUpDate,  await UserController.update);
router.delete('/user/:_id', await UserRequest.validateDelete, await UserController.delete);

//Login
router.post('/login', await SessionRequest.validateSession, await UserSessionController.login);
router.get('/logout/:session_id', await SessionRequest.validateSession, await UserSessionController.logout);

//Change Password
router.get('/token', await ChangePasswordRequest.validateGetToken, await TokensForChangePasswordController.getToken);
router.post('/changepassword', await ChangePasswordRequest.validateChangePassword, await TokensForChangePasswordController.ChangePassword);

//Article
router.post('/article', await ArticleRequest.validateArticle, await ArticleController.article);