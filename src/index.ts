import {createServer} from "node:http"
import { extractPostData } from "./utils";
import { User } from "./interfaces";
import { randomUUID } from "node:crypto";



let database: User[]  = []  

const server = createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    console.log('server is running')

    const getSpecificUserRegex = /^api\/users\/[^\/]+$/


    // Get all users
    if (req.url === 'api/users' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(database));
    } 

    // Get specific user
    
    if ( typeof req.url === "string" && getSpecificUserRegex.test(req.url) && req.method === 'GET') {
        const uuidRegex = /[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}(?:\/.*)?$/
        const userId = req.url.split('/')[2];
        const isUuid = uuidRegex.test(userId);
        if (!isUuid){
            res.writeHead(400);
            res.end("Aha, I saw that. That was not a uuid you asked me to find, silly")
        } else {
            const user = database.find(user => user.id === userId);
            if (user) {
                res.writeHead(200);
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(400);
                res.end("Don't know anyone by that name, hun")
            }
        }
    } 

    //Post new user

    if (req.url === 'api/users' && req.method === 'POST') {
        const extractedUser = await extractPostData(req);
        const noUserExtracted = extractedUser === "error"
        const userMissingReqFields = typeof extractedUser !== 'string' && (!extractedUser.userName || !extractedUser.age)

        if (noUserExtracted || userMissingReqFields){
            res.writeHead(400);
            res.end("Ah Ah Ah, you forgot to tell me the age and the name of the person I am supposed to register, you silly goose.")
        } else {
            const newId = randomUUID();
            (extractedUser as User).id = newId;
            database.push(extractedUser as User);
            console.log(database);
            res.writeHead(201);
            res.end(extractedUser)

        }
    } 
})

const PORT = process.env.port || 4000

server.listen(PORT, () => { console.log(`server is working, port ${PORT}`)})