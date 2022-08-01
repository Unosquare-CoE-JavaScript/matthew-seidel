import { Actions, Effect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { DataPersistence } from "@nrwl/nx";
import { Project } from "../../projects/project.model";
import { ProjectsService } from "../../projects/projects.service";
import {
  LoadProjects,
  ProjectsActionTypes,
  AddProject,
  ProjectAdded,
  ProjectsLoaded,
  DeleteProject,
  UpdateProject,
} from "./projects.actions";
import { ProjectsState } from "./projects.reducer";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ProjectsEffects {
  @Effect() LoadProjects$ = this.dataPersistence.fetch(
    ProjectsActionTypes.LOAD_PROJECTS,
    {
      run: (action: LoadProjects, state?: Project) => {
        return this.projectsService
          .all()
          .pipe(map((projects: Project[]) => new ProjectsLoaded(projects)));
      },
      onError: (action: any, error) => {
        console.error("Error", error);
      },
    }
  );

  @Effect() addProjects$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.ADD_PROJECT,
    {
      run: (action: AddProject, state: Project) => {
        return this.projectsService
          .create(action.payload)
          .pipe(map((project: Project) => new ProjectAdded(project)));
      },
      onError: () => {},
    }
  );

  @Effect() deleteProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.DELETE_PROJECT,
    {
      run: (action: DeleteProject, state: Project) => {
        return this.projectsService
          .delete(action.payload)
          .pipe(map((project: Project) => new DeleteProject(project)));
      },
      onError: () => {},
    }
  );

  @Effect() updateProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.UPDATE_PROJECT,
    {
      run: (action: UpdateProject, state: Project) => {
        return this.projectsService
          .update(action.payload)
          .pipe(map((project: Project) => new UpdateProject(project)));
      },
      onError: () => {},
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<Project>,
    private projectsService: ProjectsService
  ) {}
}
