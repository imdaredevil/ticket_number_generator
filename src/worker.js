const Bull = require('bull');
const Ticket = require('./model');

const requestQueue = new Bull('request-queue');

let projects = {}, responses = {};

function validateData(data){
    return data && data.title && (typeof data.title == 'string' || data.title instanceof String)
}

requestQueue.on('completed',(job,result) => {
    try {
        const response = responses[job.id];
        if(!response)
        {
            throw new Error("response not found");
        }
        response.json({
            ticketId: result,
            title: job.data.title
        });
    }
    catch(err){
        console.error("The following error occured while sending response");
        console.error(err);
    }
});

requestQueue.on('failed',(job,error) => {

    try {

        const response = responses[job.id];
        if(!response)
        {
            throw new Error("response not found");
        }
        response.status(500);
        response.json({
            errors: [error]
        });
    }
    catch(err){
        console.error("The following error occured while sending response");
        console.error(err);
    }
});



async function addProject(projectName)
{
    try {
        if(!projects[projectName])
        {
            
            projects[projectName] = await Ticket.findOne({
                project: projectName
            });
            if(!projects[projectName])
                projects[projectName] = new Ticket(projectName,0);
            requestQueue.process(projectName,1,async (job) => {
                    projects[projectName].number += 1;
                    await projects[projectName].save();
                    return projects[projectName].number;
            });
        }
    }
    catch(err){
        throw err;
    }
}

async function addRequest(projectName,data,res)
{
    try {
        if(!validateData(data))
            throw new Error("data should have title and the title should be of string type");
        await addProject(projectName);
        const request = await requestQueue.add(projectName,{
            ...data
        });
        responses[request.id] = res;
    }
    catch(err){
        console.error(err);
        res.status(500);
        res.json({
            error: err,
        });
    }
}

module.exports = {
    addRequest
}