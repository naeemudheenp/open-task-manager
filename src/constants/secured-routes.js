export const securedRoutes = [
  {
    name: 'Dashboard',
    access: ['ADMIN', 'MANAGER', 'USER'],
    url: '/dashboard'
  },
  {
    name: 'Employees',
    access: ['ADMIN'],
    url: '/employees'
  },
  {
    name: 'Team',
    access: ['ADMIN', 'MANAGER'],
    url: '/team'
  },

]