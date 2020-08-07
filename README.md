#Icremental and unique ticket generator

A fun task at Pando.

- The api has a single endpoint 
> api/ticket

- The payload should have two parameters *projectName* and *ticketTitle* . Hence a typical payload may look like
> {
        ticketTitle: "bugfix",
        projectName: "PANDO"
}

- For each project independent ticket number for each title are issued incrementally. The response would be
> {
     "data" : {
         ticketTitle: "bugfix"
         ticketId: 1
     }
}