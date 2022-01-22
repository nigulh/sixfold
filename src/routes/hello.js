/**
 * @swagger
 * components:
 *   schemas:
 *     pingResponse:
 *       required:
 *         - echo
 *       properties:
 *         echo:
 *           type: string
 *           example: hello
 */

/**
 * @swagger
 * /ping/{message}:
 *   get:
 *     tags:
 *       - ping
 *     summary: Echo the path parameter
 *     description: For testing only
 *     parameters:
 *       - name: message
 *         in: path
 *         description: Message to echo
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Double echo response
 *         schema:
 *           $ref: '#/components/schemas/pingResponse'
 */
