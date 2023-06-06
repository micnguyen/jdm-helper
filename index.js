#! /usr/bin/env node
import { parse } from "./commands/parse.js"
import { Command } from 'commander';
import appPackage from "./package.json" assert { type: "json" };

const program = new Command();

program.name('jdm-helper')
  .description("CLI tool to help identify what online accounts you have that can be deleted")
  .version(appPackage.version)

program
  .argument('<file>')
  .description('Reads an exported CSV file from a password manager')
  .action(parse)

program.parse()