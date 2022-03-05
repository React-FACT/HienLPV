const express = require('express');
const RoleRouting = express.Router();
const { CommonMethodConstant, ControllerConstant } = require("../constants/api.constant");
const {
  getAll,
  getById,
  create,
  update,
  remove
} = require('../controllers/role.constroller');
RoleRouting.use(express.json())

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRoleRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         actived:
 *           type: boolean
 * 
 *     UpdateRoleRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         actived:
 *           type: boolean
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
 * /api/v1/role/get-all: 
 *   get: 
 *     tags:
 *       - Role
 *     description: Get all Data 
 *     responses:  
 *       200: 
 *         description: Success
 *         content:
 *            application/json:
 *               schema:
 *                  $ref: '#/components/schemas/ResponseDto'
 */
RoleRouting.get(CommonMethodConstant.GetAll, getAll);

/** 
 * @swagger 
 * /api/v1/role/{id}:
 *   get: 
 *     tags: 
 *       - Role
 *     description: Get data by Id 
 *     parameters: 
 *       - in: path
 *         name: id 
 *         description: Primary key 
 *         required: true 
 *         schema:
 *             type: integer 
 *     responses:  
 *         200: 
 *             description:  Return ResponseDto
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/ResponseDto'
 *             
 *   
 */
RoleRouting.get(CommonMethodConstant.GetById, getById);

/**
 * @swagger
 * /api/v1/role:
 *   post:
 *     summary: Create a new book
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoleRequest'
 *     responses:
 *       200:
 *         description: Returen ResponseDto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseDto'
 *       500:
 *         description: Some server error
 */

RoleRouting.post(CommonMethodConstant.Create, create);

/**
* @swagger
* /api/v1/role/{id}:
*   put:
*     summary: Create a new book
*     tags: [Role]
*     parameters: 
*       - in: path
*         name: id 
*         description: Primary key 
*         required: true 
*         schema:
*             type: integer 
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UpdateRoleRequest'
*     responses:
*       200:
*         description: Returen ResponseDto
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ResponseDto'
*       500:
*         description: Some server error
*/
RoleRouting.put(CommonMethodConstant.Update, update);

RoleRouting.delete(CommonMethodConstant.Delete, remove);

module.exports = { RoleRouting };