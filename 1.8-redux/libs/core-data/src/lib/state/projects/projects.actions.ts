import { Action } from "@ngrx/store";
import { Project } from "../../projects/project.model";

export enum ProjectsActionTypes {
  GET_PROJECTS = "[Projects] Get Projects",
  LOAD_PROJECTS = "[Projects] Load Projects",
  LOADED_PROJECTS = "[Projects] Loaded Projects",
  ADD_PROJECT = "[Projects] Add Project",
  PROJECT_ADDED = "[Projects] Project Added",
  UPDATE_PROJECT = "[Projects] Update Project",
  DELETE_PROJECT = "[Projects] Delete Project",
  SET_SELECTED_PROJECT = "[Projects] Set Selected Project",
}

export class ProjectsLoaded implements Action{
  readonly type = ProjectsActionTypes.LOADED_PROJECTS;
  constructor (public payload: Project[]) {}
}

export class ProjectAdded implements Action{
  readonly type = ProjectsActionTypes.PROJECT_ADDED;
  constructor (public payload: Project) {}
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LOAD_PROJECTS;
  constructor(public payload?: Project[]) {}
}

export class GetProjects implements Action {
  readonly type = ProjectsActionTypes.GET_PROJECTS;
}

export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.SET_SELECTED_PROJECT
  constructor(public payload: string) {
    console.log("SelectProject", payload);
    
  }
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UPDATE_PROJECT;
  constructor(public payload: Project) {}
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DELETE_PROJECT
  constructor(public payload: Project) {
    console.log(payload);    
  }
}

export class AddProject implements Action {
  readonly type = ProjectsActionTypes.ADD_PROJECT;
  constructor(public payload: Project) {}
}

export type ProjectsActions =
  | SelectProject
  | AddProject
  | ProjectsLoaded
  | ProjectAdded
  | UpdateProject
  | DeleteProject
  | LoadProjects
  | GetProjects
  | ProjectsLoaded
  | ProjectAdded;
