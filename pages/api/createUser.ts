import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

import constants from '../../config/constants';

const prisma = new PrismaClient();

const createUser = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { user, password } = JSON.parse(req.body);

    const foundUser = await prisma.users.findUnique({ where: { user } });

    if (foundUser !== null) {
      res.send({ error: constants.errors.userAlreadyExists, success: false });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, constants.hashRounds);
    await prisma.users.create({
      data: {
        password: hashedPassword,
        user
      }
    });

    res.send({ hashedPassword, success: true });
  }
};

export default createUser;
