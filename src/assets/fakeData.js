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
    date: '2020-08-03',
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
    date: '2020-08-14',
    done: false,
    category: { id: 1, name: 'Waiting for', color: '#673AB7' }
  },
  {
    id: 2,
    title: 'Dar de comer às gatas',
    date: '2020-08-13',
    done: false,
    category: { id: 2, name: 'House', color: '#FFC107' }
  },
  {
    id: 3,
    title: 'Entregar trabalho',
    date: '2020-08-15',
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

export const expenses = [
  {
    id: 3,
    title: 'Conta Hospital',
    date: '2020-08-04',
    value: 57.75,
    category: { id: 2, name: 'Saúde', color: '#FFC107' }
  },
  {
    id: 1,
    title: 'Compras Continente',
    date: '2020-08-05',
    value: 57.75,
    category: { id: 3, name: 'Casa', color: '#FF9800' }
  },
  {
    id: 2,
    title: 'Gasóleo',
    date: '2020-08-05',
    value: 57.75,
    category: { id: 1, name: 'Transportes', color: '#673AB7' }
  },
  {
    id: 4,
    title: 'Compras Pull&Bear',
    date: '2020-08-07',
    value: 57.75,
    category: { id: 4, name: 'Vestuário', color: '#9E9E9E' }
  },
  {
    id: 5,
    title: 'Livro Amazon',
    date: '2020-08-08',
    value: 57.75,
    category: { id: 5, name: 'Educação', color: '#E91E63' }
  },
  {
    id: 6,
    title: 'Jogo XBOX',
    date: '2020-08-10',
    value: 57.75,
    category: { id: 5, name: 'Lazer', color: '#4CAF50' }
  }
]

export const expensesCategories = [
  { id: 1, name: 'Transportes', color: '#673AB7' },
  { id: 2, name: 'Saúde', color: '#FFC107' },
  { id: 3, name: 'Casa', color: '#FF9800' },
  { id: 4, name: 'Vestuário', color: '#9E9E9E' },
  { id: 5, name: 'Educação', color: '#E91E63' },
  { id: 6, name: 'Lazer', color: '#4CAF50' }
]

export const habits = [
  {
    id: 1,
    title: 'Fazer exercício',
    days: [
      { date: '2020-07-29', done: true },
      { date: '2020-07-30', done: true },
      { date: '2020-08-06', done: true },
      { date: '2020-08-07', done: true },
      { date: '2020-08-08', done: true },
      { date: '2020-08-09', done: false },
      { date: '2020-08-10', done: true },
      { date: '2020-08-11', done: true },
      { date: '2020-08-12', done: true },
      { date: '2020-08-13', done: true },
      { date: '2020-08-14', done: true },
      { date: '2020-08-15', done: true },
      { date: '2020-08-16', done: true },
      { date: '2020-10-09', done: true },
      { date: '2020-10-01', done: false }
    ]
  },
  {
    id: 2,
    title: 'Fazer dieta',
    days: [
      { date: '2020-08-06', done: true },
      { date: '2020-08-07', done: true },
      { date: '2020-08-09', done: true },
      { date: '2020-08-10', done: false },
      { date: '2020-08-11', done: true }
    ]
  }
]
