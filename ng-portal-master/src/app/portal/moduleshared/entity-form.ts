export class EntityForm {
  constructor(
    public action?: EntityAction,
    public entity?: any,
  ) {
  }
}

export enum EntityAction {
  NEW = 'NEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}
