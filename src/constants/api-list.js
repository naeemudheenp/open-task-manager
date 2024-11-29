

export const apiList = {
  addCompanyName: {
    api: "/api/add-company-name",
    desc: 'To add company name',
    access: ["ADMIN", "MANAGER", "USER"]
  },
  checkUserIsAlreadyRegistered: {
    api: "/api/check-user-already-registered",
    desc: 'To check whether user already registered.',
    access: ["ADMIN", "MANAGER", "USER"]
  },
  getEmployees: {
    api: '/api/get-employees',
    desc: 'Get employee list.',
    access: ["ADMIN", "MANAGER", "USER"]
  },
  patchEmployeeData: {
    api: '/api/patch-employee-data',
    desc: 'Patch employee data',
    access: ["ADMIN"]
  },
  deleteUser: {
    api: '/api/delete-user',
    desc: 'Delete user',
    access: ["ADMIN", "MANAGER"]

  },
  createTask: {
    api: '/api/create-task',
    desc: 'create task',
    access: ["ADMIN", "MANAGER", "USER"]
  },
  getTask: {
    api: '/api/get-tasks',
    desc: 'get task',
    access: ["ADMIN", "MANAGER", "USER"]
  },
  patchTaskData: {

    api: '/api/patch-task-data',
    desc: 'update task',
    access: ["ADMIN", "MANAGER", "USER"]
  }

}