export const notes = [
  {
    id: 1,
    title: 'Lista de compras',
    date: '2020-07-20',
    content: 'asdasdad',
    tags: [
      { id: 1, name: 'Primary', color: '#F44336' },
      { id: 2, name: 'Secondary', color: '#E91E63' }
    ]
  },
  {
    id: 2,
    title: 'Apontamentos aula',
    date: '2020-06-25',
    content: 'asdasdad',
    tags: [
      { id: 3, name: 'Studies', color: '#607D8B' },
      { id: 4, name: 'School', color: '#00BCD4' }
    ]
  },
  {
    id: 3,
    title: 'Random shit',
    date: '2020-07-15',
    content: 'asdasdad',
    tags: [{ id: 5, name: 'Random', color: '#3F51B5' }]
  },
  {
    id: 4,
    title: 'Work shit',
    date: '2020-07-15',
    content: 'asdasdad',
    tags: [
      { id: 6, name: 'Work', color: '#9C27B0' },
      { id: 7, name: 'Coding', color: '#FF9800' },
      { id: 8, name: 'Stuff', color: '#4CAF50' }
    ]
  },
  {
    id: 5,
    title: 'Post 129',
    date: '2020-05-07',
    content: 'asdasdad'
  }
]

export const notesTags = [
  { id: 1, name: 'Primary', color: '#F44336' },
  { id: 2, name: 'Secondary', color: '#E91E63' },
  { id: 3, name: 'Studies', color: '#607D8B' },
  { id: 4, name: 'School', color: '#00BCD4' },
  { id: 5, name: 'Random', color: '#3F51B5' },
  { id: 6, name: 'Work', color: '#9C27B0' },
  { id: 7, name: 'Coding', color: '#FF9800' },
  { id: 8, name: 'Stuff', color: '#4CAF50' }
]

export const tasks = [
  {
    id: 1,
    title: 'Ir às compras',
    date: '2020-07-20',
    done: false,
    category: { id: 1, name: 'Waiting for', color: '#673AB7' }
  },
  {
    id: 2,
    title: 'Dar de comer às gatas',
    date: '2020-08-03',
    done: false,
    category: { id: 2, name: 'House', color: '#FFC107' }
  },
  {
    id: 3,
    title: 'Entregar trabalho',
    date: '2020-08-04',
    done: false
  },
  {
    id: 4,
    title: 'Fazer wireframe da App',
    date: '2020-08-05',
    done: false,
    category: { id: 3, name: 'Trackit', color: '#FF9800' }
  },
  {
    id: 5,
    title: 'Fazer design da App',
    date: '2020-08-06',
    done: false,
    category: { id: 3, name: 'Trackit', color: '#FF9800' }
  },
  {
    id: 6,
    title: 'Estudar React',
    date: '2020-08-07',
    done: false
  },
  {
    id: 7,
    title: 'Esta não devia aparecer',
    date: '2020-08-08',
    done: true
  }
]

export const tasksCategories = [
  { id: 1, name: 'Waiting for', color: '#673AB7' },
  { id: 2, name: 'House', color: '#FFC107' },
  { id: 3, name: 'Trackit', color: '#FF9800' },
  { id: 4, name: 'Stuff', color: '#9E9E9E' },
  { id: 5, name: 'Personal', color: '#E91E63' }
]
