export { default as User } from '~/models/course/user'
export { default as Group } from '~/models/course/group'

class ModelCourse {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

export default ModelCourse
