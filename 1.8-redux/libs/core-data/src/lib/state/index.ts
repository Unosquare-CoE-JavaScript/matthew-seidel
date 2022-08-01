import { Project } from "@workshop/core-data";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

import * as fromCustomers from "./customers/customers.reducer";
import * as fromProjects from "./projects/projects.reducer";

export interface AppState {
  customers: fromCustomers.CustomersState;
  projects: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducer,
};

//---------------------------------------------------------------------------------------------------------------------
// PROJECTS SELECTORS
//---------------------------------------------------------------------------------------------------------------------
export const selectProjectState = createFeatureSelector<
  fromProjects.ProjectsState
>("projects");

export const selectProjectIds = createSelector(
  selectProjectState,
  fromProjects.selectProjectIds
);

export const selectAllProjects = createSelector(
  selectProjectState,
  fromProjects.selectAllProjects
);

export const selectEntities = createSelector(
  selectProjectState,
  fromProjects.selectProjectEntities
);

export const selectCurrentProjectId = createSelector(
  selectProjectState,
  fromProjects.getSelectedProjectId
);

const emptyProject: Project = {
  id: null,
  title: "",
  details: "",
  percentComplete: 0,
  approved: false,
  customerId: null,
};

export const selectCurrentProject = createSelector(
  selectEntities,
  selectCurrentProjectId,
  (projectEntities, projectId) =>
    projectId ? projectEntities[projectId] : emptyProject
);

// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<
  fromCustomers.CustomersState
>("customers");

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);

export const selectCostumersProjects = createSelector(
  selectAllCustomers,
  selectAllProjects,
  (customers, projects) => {
    return customers.map((customer) =>
      Object.assign(
        {},
        {
          ...customer,
          projects: projects.filter(
            (project) => project.customerId === customer.id
          ),
        },
        {}
      )
    );
  }
);
