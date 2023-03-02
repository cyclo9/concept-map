import db from '@/lib/mongo'

export default async function handler(req: any, res: any) {
    const collection: any = db.collection('_')

    // * ### Read ###
    if (req.method === 'GET') {
        const _ = await collection.find().toArray();

        res.status(200).json(_[0]._)
    }
}