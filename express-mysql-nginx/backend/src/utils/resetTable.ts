// eslint-disable-next-line import/no-extraneous-dependencies
import { Prisma } from ".prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resetTable = async (modelNames: Prisma.ModelName[]): Promise<void> => {
  const tableNames = modelNames.map((modelName) => ({ tableName: modelName }));

  // eslint-disable-next-line no-restricted-syntax
  for (const { tableName } of tableNames) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tableName};`);
    } catch (_error) {
      // TODO: error logging
    }
  }
};
