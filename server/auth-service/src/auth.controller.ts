import { createSuccessResponse } from "@shared/utils";
import { prisma } from "./lib/prisma";
import { Request, Response } from "express";

export async function register(req:Request, res:Response) {

    const { email, password } = req.body;
    
    const user = await prisma.user.create({
        data: {
            email,
            password
        }
    });
    console.log('user calisti');

    res.status(201).send(createSuccessResponse(user, 'User registered successfully'));
}