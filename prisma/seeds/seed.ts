import { PrismaClient } from '@prisma/client';
import { createEmblems } from './inserts/emblems';

async function execute(prisma: PrismaClient) {
  console.log('Seeding...');

  await createEmblems(prisma);
}

export async function seed(prisma: PrismaClient) {
  try {
    await execute(prisma);
    console.log('✅ Seeding executed with success!');
  } catch (error) {
    // await import('./truncate');
    console.error(error);
    console.log('❌ Error while seeding: ');
  }
}
