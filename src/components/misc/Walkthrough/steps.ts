export const pagesSteps: { [key: string]: any } = {
  HOME: [
    {
      target: 'body',
      placement: 'center' as 'center',
      title: 'Welcome to TRCKR!',
      content:
        "Seems like it’s your first time here. Follow this quick walkthrough to learn all the basic features so you can start tracking everything in your life like a pro! Smartphone users can install TRCKR on their homescreen through the browser's settings. ",
      disableBeacon: true
    },
    {
      target: '.widget-notes',
      content:
        'Create all sorts of notes you want. On each note you can add tags, so you can easily organize them.',
      disableBeacon: true
    },
    {
      target: '.widget-tasks',
      content:
        'Your advanced To-do list for all your tasks. Create inboxes so you can keep everything in place.',
      disableBeacon: true
    },
    {
      target: '.widget-habits',
      content:
        'Track all of your habits in a really simple way and check your progress.',
      disableBeacon: true
    },
    {
      target: '.widget-expenses',
      content:
        'Control all of your expenses. Know exactly on what you are spending and how you are spending.',
      disableBeacon: true
    }
  ],
  NOTES: [
    {
      target: '.single-note:first-child',
      content:
        'This is an awesome note. You can tap on it to view and edit it or, if you’re done with it, delete it.',
      disableBeacon: true
    },
    {
      target: '.add-note-icon',
      content:
        'Add a new note. Simply write a title, the content and add the tags you wish to.',
      disableBeacon: true
    },
    {
      target: '.settings-icon',
      content: 'Sort your notes and create, edit or delete tags.',
      disableBeacon: true
    },
    {
      target: '#notes-view',
      content:
        'Filter all the notes you are seeing. You can see them all at once or select a specific tag.',
      disableBeacon: true
    }
  ],
  TASKS: [
    {
      target: '.single-task:first-child',
      content:
        'You can tap on each task to edit it. To mark the task as completed, simply tap the purple circle.',
      disableBeacon: true
    },
    {
      target: '.add-task-icon',
      content:
        'Add a new task. Simply insert a title, select the due date and select an inbox for it if you wish to.',
      disableBeacon: true
    },
    {
      target: '.settings-icon',
      content: 'Sort your tasks and create, edit or delete your inboxes.',
      disableBeacon: true
    },
    {
      target: '.done-tasks',
      content: 'Check all of the tasks you completed.',
      disableBeacon: true
    },
    {
      target: '#tasks-view',
      content:
        'Filter what tasks you are seeing. Everytime you create a new inbox, it will show up here.',
      disableBeacon: true
    }
  ],
  EXPENSES: [
    {
      target: '.single-expense:first-child',
      content:
        'Each expenses will show up beneath the date where it was made. Tap on it to edit it.',
      disableBeacon: true
    },
    {
      target: '.add-expense-icon',
      content:
        'Add new expenses. Just insert the value, a title, the date when it was made and associate it with a category.',
      disableBeacon: true
    },
    {
      target: '.settings-icon',
      content:
        'Select your preferred currency and create, edit or delete your categories.',
      disableBeacon: true
    },
    {
      target: '.stats-icon',
      content:
        'Analyse your spendings - in what months did you spend the most, what categories are you spending more, etc.',
      disableBeacon: true
    },
    {
      target: '#expenses-view',
      content:
        'Set the time frame that you want to see. You will only see expenses that were made during this time.',
      disableBeacon: true
    }
  ],
  HABITS: [
    {
      target: '.calendar-header',
      content:
        'Use the calendar header to navigate between dates by tapping the arrows.',
      disableBeacon: true
    },
    {
      target: '.single-habit',
      content:
        'When tracking an habit, tap once on the days you were successful and double tap on the ones that you weren’t.',
      disableBeacon: true
    },
    {
      target: '.add-habit-icon',
      content: "Add a new habit. Just give it a title and you're done!",
      disableBeacon: true
    },
    {
      target: '.stats-icon',
      content:
        'Analyse you habits and keep an eye on your success rate, your streaks, etc',
      disableBeacon: true
    },
    {
      target: '#habits-view',
      content: 'Choose here to see all habits at once or only one at a time.',
      disableBeacon: true
    },
    {
      target: '.habits-counter',
      content:
        "Number of habits you have when seeing all habits at once. If you choose a specific habit you'll find here your current success streak for that habit.",
      disableBeacon: true
    }
  ],
  ADDNOTES: [
    {
      target: '.tags-input',
      content:
        "To insert tags on a note start typing and your existing tags will appear for you to select. To create a new one just type the name for it and press 'Enter'.",
      disableBeacon: true
    }
  ]
}
