type SuccessResponse = {
    code: 200 | 201 | 301;
    text: string
};

type ErrorResponse = {
    code: 400 | 404 | 500;
    text: string;
    printChars?: number
};

function printResponseText (response: SuccessResponse | ErrorResponse): void {
    if ('printChars' in response && response.printChars !== undefined) {
        console.log(response.text.substring(0, response.printChars));
    } else {
        console.log(response.text);
    }
}

printResponseText({ code: 200, text: 'OK' });
printResponseText({ code: 201, text: 'Created' });
printResponseText({ code: 400, text: 'Bad Request', printChars: 4 });
printResponseText({ code: 404, text: 'Not Found' });
printResponseText({ code: 404, text: 'Not Found', printChars: 3 });
printResponseText({ code: 500, text: 'Internal Server Error', printChars: 1 });