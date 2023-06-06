import { table } from "table"
import chalk from 'chalk';

export const renderTable = (({ appVersion, passwordManager, filename, inputData }) => {
  const tableData = [
    [chalk.green.bold('JDM Helper v' + appVersion), '', ''],
    [chalk.bold('Password Manager: ') + passwordManager, '', chalk.bold('Filename: ') + filename],
    [chalk.bold('Name'), chalk.bold('Difficulty'), chalk.bold('Delete Account URL')],
  ];

  // generate table info
  inputData.forEach(element => {
    const data = [
      element.name,
      labelForDifficulty(element.difficulty),
      element.url
    ]
    tableData.push(data)
  })

  const tableConfig = {
    columns: [
      { alignment: 'left', width: 30 },
      { alignment: 'left' },
      { alignment: 'left', width: 100 }
    ],
    spanningCells: [
      { col: 0, row: 0, colSpan: 3, alignment: 'center' },
      { col: 0, row: 1, colSpan: 2, alignment: 'center' },
      { col: 2, row: 1, colSpan: 1, alignment: 'center' },
    ],
  };

  console.log(table(tableData, tableConfig))
})

const labelForDifficulty = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return chalk.black.bgGreen('Easy')
      break
    case 'medium':
      return chalk.black.bgYellowBright('Medium')
      break
    case 'hard':
      return chalk.black.bgRedBright('Hard')
      break
    case 'limited':
      return chalk.black.bgMagenta('Limited')
      break
    case 'impossible':
      return chalk.white.bgBlackBright('Impossible')
      break
  }
}