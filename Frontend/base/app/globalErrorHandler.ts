import { ErrorHandler, Injectable } from "@angular/core";
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        if (chunkFailedMessage.test(error?.message)) {
            window.location.reload();
        } else if(error instanceof TypeError) {
            console.error(error)
        } else {
            console.log(error)
        }
    }
}