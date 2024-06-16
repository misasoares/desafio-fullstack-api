import { PrismaClient } from '@prisma/client';
import { Command } from 'commander';
import { seed } from './seed';

const program = new Command();

program
  .command('seed')
  .description('Seed database')
  .action(async () => {
    const prisma = new PrismaClient();
    try {
      await seed(prisma);
    } catch {
    } finally {
      await prisma.$disconnect();
    }
  });

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
