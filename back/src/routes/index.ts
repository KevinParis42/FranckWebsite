import express, {Request, Response} from 'express'
import User from '../db/models/user.model';

let router = express.Router();

router.use('/users', async (req: Request, res: Response) => {
    const users = await User.findAll()
    res.json(users)
})

router.use('/', async (req: Request, res: Response) => {
    const created = await User.create({firstName: 'firstname', lastName: 'lastname'})
    res.json(created)
})


export default router
