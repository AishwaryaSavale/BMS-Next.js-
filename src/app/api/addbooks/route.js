import { MongoClient, ObjectId } from "mongodb";

const url = 'mongodb://localhost:27017'
const database = 'BSM'

export async function POST(params) {

    const data = await params.json()

    const title = data.title
    const author = data.author
    const type = data.type
    const quantity = data.quantity
    const description = data.description
    const year = data.year

    try {
        const client = await MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
        const db = client.db(database)
        const bookCollection = db.collection("books")

        const newBooks = {
            title, author, type, quantity, description, year, createdAt: new Date().toLocaleDateString()
        }
        const res = await bookCollection.insertOne(newBooks)
        client.close()
        return new Response(JSON.stringify({ status: true, message: "Book Inserted !!" }),
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


export async function PUT(params) {

    const data = await params.json()
    const { id, title, author, type, quantity, description, year } = data

    try {
        const client = await MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
        const db = client.db(database)
        const bookCollection = db.collection("books")

        const res = await bookCollection.updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                title, author, type, quantity, description, year, createdAt: new Date().toLocaleDateString()
            }
        })
        client.close()
        if (res.modifiedCount > 0) {
            return new Response(JSON.stringify({ status: true, message: "Book Updated !!" }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

        } else {
            return new Response(JSON.stringify({ status: false, message: "Book  Not Updated !!" }),
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

export async function DELETE(params) {
    const data = await params.json()
    const { id } = data

    try {
        const client = await MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
        const db = client.db(database)
        const bookCollection = db.collection("books")

        const res = await bookCollection.deleteOne({
            _id: new ObjectId(id)
        })
        client.close()
        if (res.deletedCount > 0) {
            return new Response(JSON.stringify({ status: true, message: "Book Deleted !!" }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

        } else {
            return new Response(JSON.stringify({ status: false, message: "Book  Not Not !!" }),
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


export async function GET(params) {
    try {
        const client = await MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
        const db = client.db(database)
        const bookCollection = db.collection("books")

        const res = await bookCollection.find().toArray()
        client.close()
        return new Response(JSON.stringify({ status: true, message: res }),
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