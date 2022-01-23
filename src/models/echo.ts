export class PingResponse {
    echo: string
    constructor(echo: string) {
        this.echo = echo + "!";
    }
}
