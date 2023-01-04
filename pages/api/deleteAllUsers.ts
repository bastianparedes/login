import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const deleteUser = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'DELETE') {
    await prisma.users.deleteMany({ where: {} });
    res.send({ success: true });
  }
};

export default deleteUser;
