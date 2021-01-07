export const pagesSteps: { [key: string]: any } = {
  HOME: [
    {
      target: 'body',
      placement: 'center' as 'center',
      title: 'Welcome to TRCKR!',
      content:
        'Seems like it’s your first time here. Follow this quick walkthrough to learn all the basic features so you can start tracking everything in your life like a pro!',
      disableBeacon: true
    },
    {
      target: 'body',
      placement: 'center' as 'center',
      content:
        'TRCKR is divided in four pages: Notes, Tasks, Expenses and Habits. On this dashboard you can access each of these tools, add something or simply check some stats.',
      disableBeacon: true
    }
  ],
  NOTES: [
    {
      target: 'body',
      placement: 'center' as 'center',
      title: 'Notes',
      content:
        'Here you can create whatever notes you want to. On each note you can add the tags that you want, so you can easily organize them.',
      disableBeacon: true
    },
    {
      target: '.single-note:first-child',
      content:
        'This is a single note. Each note has a title, the date when it was created and it may have tags associated to it. You can click on it to open it and see its content.',
      disableBeacon: true
    },
    {
      target: '.add-note-icon',
      content:
        'Click here to add a new note. Simply write a title, write the content of your note, and add tags on the bottom left corner.',
      disableBeacon: true
    },
    {
      target: '.settings-icon',
      content:
        "On the settings you'll be able to sort your notes and you can also create, edit and delete your tags.",
      disableBeacon: true
    },
    {
      target: '#notes-view',
      content:
        'On this dropdown is where you can filter all the notes you are seeing. You can see them all at once, or only from a specific tag.',
      disableBeacon: true
    },
    {
      target: '.notes-counter',
      content: 'This number shows you how many notes you have.',
      disableBeacon: true
    }
  ],
  TASKS: [
    {
      target: 'body',
      placement: 'center' as 'center',
      title: 'Tasks',
      content:
        'This is your advanced To-do list for all your tasks. Once you create a task, you can then conclude it here by clicking on the status circle of each task.',
      disableBeacon: true
    },
    {
      target: '.single-task:first-child',
      content:
        'This is a single task. Each task has a title, the due date and it may be associated with a category. To mark the task as completed, simply click on the circle on the right side. To edit the task, just click on it.',
      disableBeacon: true
    },
    {
      target: '.add-task-icon',
      content:
        'Click here to add a new task. Simply write a title for your task, select the due date and associate it with a category if you want to keep things organized.',
      disableBeacon: true
    },
    {
      target: '.settings-icon',
      content:
        "On the settings you'll be able to sort your tasks and you can also create, edit and delete your categories.",
      disableBeacon: true
    },
    {
      target: '.done-tasks',
      content: 'This is where you can see all of your completed tasks.',
      disableBeacon: true
    },
    {
      target: '#tasks-view',
      content:
        'On this dropdown you can filter what tasks you are seeing. You can see all, only see the ones that due for today, the ones that are due for tomorrow or simply see by category.',
      disableBeacon: true
    },
    {
      target: '.tasks-counter',
      content: 'This is number of tasks you have on the current view.',
      disableBeacon: true
    }
  ],
  EXPENSES: [
    {
      target: '#root',
      placement: 'center' as 'center',
      title: 'Expenses',
      content:
        'This is where you control all of your expenses. Everytime you buy something, make sure you track it here.',
      disableBeacon: true
    },
    {
      target: '.single-expense:first-child',
      content:
        'This is a single expense. Each expense has a value, a title, the date of said expense and it may be associated with a category. To edit the expense, just click on it.',
      disableBeacon: true
    },
    {
      target: '.add-expense-icon',
      content:
        'Click here to add a new expense. Simply input the value of your expense, write a title for it, select the expense date and associate it with a category to keep things organized.',
      disableBeacon: true
    },
    {
      target: '.settings-icon',
      content:
        "On the settings you'll be able to sort your tasks and you can also create, edit and delete your categories.",
      disableBeacon: true
    },
    {
      target: '.stats-icon',
      content:
        'In here you can check some statistics on your spendings - in what months did you spend the most, see expenses by categories, etc.',
      disableBeacon: true
    },
    {
      target: '#expenses-view',
      content:
        'Select here the period that you want to see. You will only see expenses that were made in this time frame.',
      disableBeacon: true
    },
    {
      target: '.expenses-counter',
      content:
        'This is the sum of all the expenses you have for the selected period.',
      disableBeacon: true
    }
  ],
  HABITS: [
    {
      target: '#root',
      placement: 'center' as 'center',
      title: 'Habits',
      content:
        'Here you can track all of your habits in a really simple way. Just add whatever habits you want to start implementing and mark the days where you follow or not follow each one.',
      disableBeacon: true
    },
    {
      target: '.calendar-header',
      content:
        'This is the calendar where you see all of your habits. Use the arrows next to the month to navigate through it.',
      disableBeacon: true
    },
    {
      target: '.single-habit',
      content:
        "This is an habit. Everyday you follow the habit successfully, just click on that day to mark it as done. If you didn't follow it, click twice to mark it as not done. You can click on the habit itself to edit it.",
      disableBeacon: true
    },
    {
      target: '.add-habit-icon',
      content:
        "Click here to add a new habit. Just give it a name and you're done!",
      disableBeacon: true
    },
    {
      target: '.stats-icon',
      content:
        'In here you can check some statistics on your habits - what is your success rate, what was your longest streak, etc.',
      disableBeacon: true
    },
    {
      target: '#habits-view',
      content:
        'Select here if you want to see all habits at once or only one at a time.',
      disableBeacon: true
    },
    {
      target: '.habits-counter',
      content:
        'This shows the number of active habits you have when seeing all habits. When you are only seeing one single habit this will show what is your current streak.',
      disableBeacon: true
    }
  ]
}
