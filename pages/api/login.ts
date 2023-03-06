import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

import constants from '../../config/constants';
import { prisma } from '../../lib/prisma';

const login = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
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

    res.send({ success: true });
  }
};

export default login;
