import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

import constants from '../../config/constants';
import { prisma } from '../../lib/prisma';

const deleteUser = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'DELETE') {
    const { user, password } = JSON.parse(req.body);

    const foundUser = await prisma.fakeUser.findUnique({ where: { user } });

    if (foundUser === null) {
      res.send({ error: constants.errors.userDoesNotExist, success: false });
      return;
    }

    const passwordIsCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!passwordIsCorrect) {
      res.send({ error: constants.errors.incorrectPassword, success: false });
      return;
    }

    await prisma.fakeUser.delete({ where: { user } });
    res.send({ success: true });
  }
};

export default deleteUser;
