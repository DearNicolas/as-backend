import { RequestHandler } from "express";
import * as groupService from '../services/groups';
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const { id_event } = req.params;

    const itens = await groupService.getAll(parseInt(id_event));
    if (itens) return res.json({ groups: itens });

    res.json({ error: ' Ocoreu um erro' });
}

export const getGroup: RequestHandler = async (req, res) => {
    const { id, id_event } = req.params;

    const groupitem = await groupService.getOne({
        id: parseInt(id),
        id_event: parseInt(id_event)
    });
    if (groupitem) return res.json({ group: groupitem })

    res.json({ error: 'Ocorreu um erro' });
}

export const addGroup: RequestHandler = async (req, res) => {
    const { id_event } = req.params;

    const addGroupSchema = z.object({
        name: z.string()
    });
    const body = addGroupSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados invalidos' });

    const newGroup = await groupService.add({
        name: body.data.name,
        id_event: parseInt(id_event)
    });
    if (newGroup) return res.status(201).json({ group: newGroup });

    res.json({ error: 'Ocorreu um erro' })
}

export const updateGroup: RequestHandler = async (req, res) => {
    const { id, id_event } = req.params;

    const updateGroupSchema = z.object({
        name: z.string().optional()
    });
    const body = updateGroupSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'dados invalidos' });

    const updatedGroup = await groupService.update({
        id: parseInt(id),
        id_event: parseInt(id_event)
    }, body.data);
    if (updatedGroup) return res.json({ group: updatedGroup });

    res.json({ error: 'Occoreu um erro' })
}

export const deleteGroup: RequestHandler = async (req, res) => {
    const { id, id_event } = req.params;

    const deletedGroup = await groupService.remove({
        id: parseInt(id),
        id_event: parseInt(id_event)
    });
    if (deletedGroup) return res.json({ group: deletedGroup })

    res.json({ error: 'Occoreu um erro' })
}