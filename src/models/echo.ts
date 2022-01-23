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
 *           example: hello!
 */

export class PingResponse {
    echo: string
    constructor(echo: string) {
        this.echo = echo + "!";
    }
}
