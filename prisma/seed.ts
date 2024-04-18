import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const categories = [];

  for (let i = 0; i < 100; i++) {
    categories.push({
      name: faker.commerce.product(),
    });
  }

  await prisma.categories.createMany({
    data: categories,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });