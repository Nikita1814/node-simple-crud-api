import { IncomingMessage } from "http"
import { User } from "./interfaces"

export function extractPostData(req: IncomingMessage) : Promise<string | User | Partial<User>>{
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(JSON.parse(body))
            })
        } catch (error) {
            resolve("error")
        }
    })
}