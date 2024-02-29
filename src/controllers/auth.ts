import { RequestHandler } from "express";
import { z } from "zod";
import * as authService from '../services/auth';

export const login: RequestHandler = (req, res) => {
    const loginSchema = z.object({
        password: z.string()
    })
    const body = loginSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados invalidos' })

    // validar a senha & gerar o token
    if (!authService.validatePassword(body.data.password)) {
        res.status(403).json({ error: 'Acesso negado' });
    }

    res.json({ token: authService.createToken() });
}

export const validate: RequestHandler = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !authService.validateToken(token)) {
        return res.status(403).json({ error: 'Acesso Negado' })
    }

    next()
}