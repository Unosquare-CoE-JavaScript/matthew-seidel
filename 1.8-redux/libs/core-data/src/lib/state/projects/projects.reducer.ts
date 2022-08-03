import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Project } from "./../../projects/project.model";
import { ProjectsActionTypes } from "./projects.actions";

export const initialProjects: Project[] = [
  {
    id: "1",
    title: "Project One",
    details: "This is a sample project",
    percentComplete: 20,
    approved: false,
    customerId: null,
  },
  {
    id: "2",
    title: "Project Two",
    details: "This is a sample project",
    percentComplete: 40,
    approved: false,
    customerId: null,
  },
  {
    id: "3",
    title: "Project Three",
    details: "This is a sample project",
    percentComplete: 100,
    approved: true,
    customerId: null,
  },
];

export const createProject = (projects, project) => [...projects, project];

export const updateProject = (projects, project) =>
  projects.map((p) => {
    return p.id === project.id ? Object.assign({}, project) : p;
  });

export const deleteProject = (projects, project) =>
  projects.filter((w) => project.id !== w.id);



export interface ProjectsState extends EntityState<Project> {
  selectedProjectId?: string;
}

  export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId:null,
  projects: initialProjects,
})

export interface ProjectState extends EntityState<Project>{
  selectedProjectId?: string;
}

export function projectsReducer(state = initialState, action): ProjectsState {
  const { type, payload } = action;  
  switch (type) {
    case ProjectsActionTypes.PROJECT_ADDED:
    return adapter.addOne(payload, state);
    case ProjectsActionTypes.UPDATE_PROJECT:
    return adapter.updateOne(payload, state);
    case ProjectsActionTypes.DELETE_PROJECT:
    return adapter.removeOne(payload.id, state);
    case ProjectsActionTypes.SET_SELECTED_PROJECT:
      return Object.assign({}, state, { selectedProjectId: payload });
    case ProjectsActionTypes.LOADED_PROJECTS:
      return adapter.addMany(payload, state);
    case ProjectsActionTypes.GET_PROJECTS:
      return adapter.addAll(initialProjects, state);
    default:
      return state;
  }
}

// Selectors 
export const getSelectedProjectId = (state: ProjectsState)=>state.selectedProjectId;

const { selectIds, selectEntities,  selectAll } = adapter.getSelectors();

export const selectProjectIds = selectIds;
export const selectProjectEntities = selectEntities;
export const selectAllProjects = selectAll;