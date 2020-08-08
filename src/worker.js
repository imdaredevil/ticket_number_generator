const Bull = require('bull');
const Ticket = require('./model');
const { response } = require('express');

const requestQueue = new Bull('request-queue');

let projects = {}, responses = {};

requestQueue.on('completed',(job,result) => {
    responses[job.id].json({
        ticketId: result,
        title: job.data.title
    });
});



async function addProject(projectName)
{
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

async function addRequest(projectName,data,res)
{
    await addProject(projectName);
    const request = await requestQueue.add(projectName,{
        ...data
    });
    responses[request.id] = res;
}

module.exports = {
    addRequest
}