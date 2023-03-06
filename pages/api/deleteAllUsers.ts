import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../lib/prisma';

const deleteUser = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'DELETE') {
    await prisma.fakeUser.deleteMany({ where: {} });
    res.send({ success: true });
  }
};

export default deleteUser;
