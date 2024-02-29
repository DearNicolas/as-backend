import { Router } from "express"
import * as eventsCon from '../controllers/events';
import * as peopleCon from '../controllers/people';

const router = Router();

router.get('/ping', (req, res) => res.json({ pong: true }));

router.get('/events/:id', eventsCon.getEvent);
router.get('/events/:id_event/search', peopleCon.searchPerson)

export default router;