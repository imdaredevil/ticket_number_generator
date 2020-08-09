const { addRequest } = require('./worker');
const { validatePayload } = require('./validator');


async function generateTicketNumber(req,res,next){
    try
    {
    let data = req.body;
    const { error: validationError, value: validatedPayload } = validatePayload(data);
    if(!validationError)
    {
        data = validatedPayload.data;
       await addRequest(data.projectName,{
            title: data.title
        },res);
    }
    else
    {
        console.error(validationError);
        res.status(400);
        res.json({
            error: validationError
        });
    }
    }
    catch(err)
    {
        console.error(err);
        res.status(500);
        res.json({
            error: err
        });
    }
}


module.exports = {
    generateTicketNumber
}