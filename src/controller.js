const { addRequest } = require('./worker');

function validateData(data){
    return data && data.data && data.data.title && data.data.projectName;
}

async function generateTicketNumber(req,res,next){
    let data = req.body;
    if(validateData(data))
    {
        data = data.data;
       await addRequest(data.projectName,{
            title: data.title
        },res);

    }
    else
    {
        console.log(data);
        res.json({
            error: "payload is not proper"
        });
    }
}


module.exports = {
    generateTicketNumber
}