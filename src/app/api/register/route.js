import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";


export async function POST(params) {

    const data= await params.json()
    const fullname = data.fullname
    const username = data.username
    const password = data.password

    const url = 'mongodb://localhost:27017'
    const database = 'BSM'

    try {
        const client = await MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
        const db = client.db(database)
        const usersCollection = db.collection("user-login")
        const existing = await usersCollection.findOne({ username })
        if (existing) {
            return new Response(JSON.stringify({ status: false, message: "User Already Exist !!" }),
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
        }

        const salRounds = 10
        const hashPassword = await bcrypt.hash(password, salRounds)
        const newUser = {
            fullname, username, password: hashPassword,
            createAt: new Date()
        }
        const result = await usersCollection.insertOne(newUser)
        client.close()
        return new Response(JSON.stringify({ status: true, message: "Registered Sucessfully !!" }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }

            })
    }
    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ status: false, message: "Internal Server Error !!" }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }


}