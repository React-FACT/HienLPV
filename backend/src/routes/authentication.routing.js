const express = require('express');
const AuthenticationRouting = express.Router();
const {
  CommonMethodConstant,
  ControllerConstant,
} = require('../constants/api.constant');
const {
  authGetAll,
  authGetById,
  create,
  remove,
} = require('../controllers/authentication.constroller');

AuthenticationRouting.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateAuthRequest:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         roleId:
 *           type: number
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *
 *     UpdateAuthRequest:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         roleId:
 *           type: number
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ResponseDto:
 *       type: object
 *       properties:
 *         errorCode:
 *           type: integer
 *         results:
 *           type: object
 *
 */

/**
 * @swagger
 * /api/v1/auth/get-all:
 *   get:
 *     tags:
 *       - Auth
 *     description: Get all Data
 *     responses:
 *       200:
 *         description: Success
 */
AuthenticationRouting.get(CommonMethodConstant.GetAll, authGetAll);

/**
 * @swagger
 * /api/v1/auth/{id}:
 *   get:
 *     tags:
 *       - Auth
 *     description: Get data by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Primary key
 *         required: true
 *         schema:
 *             type: integer
 *     responses:
 *       200:
 *         description: Created
 *
 */
AuthenticationRouting.get(CommonMethodConstant.GetById, authGetById);

/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAuthRequest'
 *     responses:
 *       200:
 *         description: Return ResponseDto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseDto'
 *       500:
 *         description: Some server error
 */

AuthenticationRouting.post(CommonMethodConstant.Create, create);

AuthenticationRouting.delete(CommonMethodConstant.Delete, remove);

module.exports = { AuthenticationRouting };
