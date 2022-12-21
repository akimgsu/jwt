var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1"
});
var jwt = require('jsonwebtoken');
exports.handler = async function (event, context) {

    let decoded = undefined;

    try {
        decoded = jwt.verify(event.queryStringParameters.token, process.env.key);
        console.log(decoded);

        let response = {
            isBase64Encoded: true,
            statusCode: 200,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Expose-Headers": "*",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ decoded: decoded })
        };
        return response
    } catch (err) {
        console.log(err);
        console.log(decoded);

        let response = {
            isBase64Encoded: true,
            statusCode: 200,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Expose-Headers": "*",
                "Access-Control-Allow-Origin": "*",
            },
            body: "error:invalid_token"
        };
        return response
    }


}
