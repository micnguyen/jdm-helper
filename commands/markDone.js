import Conf from 'conf';
import chalk from 'chalk';

export const markDone = ({tasks}) => {

  const config = new Conf({projectName: 'todo-list'});

  let todosList = config.get('todo-list')

    if (todosList) {
        //loop over the todo list tasks
        todosList = todosList.map((task, index) => {
            //check if the user specified the tasks to mark done
            if (tasks) {
                //check if this task is one of the tasks the user specified
                if (tasks.indexOf(index.toString()) !== -1) {
                    //mark only specified tasks by user as done
                    task.done = true
                }
            } else {
                //if the user didn't specify tasks, mark all as done
                task.done = true
            }
            return task
        });

        //set the new todo-list
        config.set('todo-list', todosList)
    }

    //show the user a message
    console.log(
        chalk.green.bold('Tasks have been marked as done successfully')
    )

}