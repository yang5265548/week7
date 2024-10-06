// const express = require('express')
// const {
//   getWorkouts, 
//   getWorkout, 
//   createWorkout, 
//   deleteWorkout, 
//   updateWorkout
// } = require('../controllers/workoutController')

// const router = express.Router()

// // GET all workouts
// router.get('/', getWorkouts)

// // GET a single workout
// router.get('/:id', getWorkout)

// // POST a new workout
// router.post('/', createWorkout)

// // DELETE a workout
// router.delete('/:id', deleteWorkout)

// // UPDATE a workout
// router.patch('/:id', updateWorkout)

// module.exports = router

const express = require('express')
const {
  getWorkouts, 
  getWorkout, 
  createWorkout, 
  deleteWorkout, 
  updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Workout management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         reps:
 *           type: integer
 *         load:
 *           type: integer
 *       required:
 *         - title
 *         - reps
 *         - load
 *       example:
 *         title: Push ups
 *         reps: 40
 *         load: 5
 */

// GET all workouts
/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: Returns an array of all workouts
 *       500:
 *         description: Internal server error
 */
router.get('/', getWorkouts)

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Retrieve a single workout
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The workout id
 *     responses:
 *       200:
 *         description: A single workout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout not found
 *       500:
 *         description: Internal server erro
 */
router.get('/:id', getWorkout)

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       201:
 *         description: The created workout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', createWorkout)

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Delete a workout
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The workout id
 *     responses:
 *       204:
 *         description: Workout deleted successfully
 *       404:
 *         description: Workout not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteWorkout)

/**
 * @swagger
 * /workouts/{id}:
 *   patch:
 *     summary: Update a workout
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The workout id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: The updated workout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', updateWorkout)

module.exports = router