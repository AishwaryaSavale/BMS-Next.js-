import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';


export async function POST(params) {

    const data = await params.json()
    const username = data.username
    const password = data.password

    const url = 'mongodb://localhost:27017'
    const database = 'BSM'

    try {
        const client = await MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
        const db = client.db(database)
        const usersCollection = db.collection("user-login")

        const user = await usersCollection.findOne({ username })
        if (!user) {
            return new Response(JSON.stringify({ status: false, message: "User Not Found." }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
        }

        const isValid= await bcrypt.compare(password,user.password) 
        if (!isValid) {
            return new Response(JSON.stringify({ status: false, message: "Wrong Password." }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
        }else{
            return new Response(JSON.stringify({ status: true, message: "Login Successfull !!" }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        }


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