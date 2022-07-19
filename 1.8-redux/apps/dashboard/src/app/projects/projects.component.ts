
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import {
  Customer,
  Project,
  ProjectsService,
  NotificationsService,
  CustomersService,
  ProjectsState,
  ProjectsFacade,
} from "@workshop/core-data";
import { select, Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import {
  DeleteProject,
  GetProjects,
  LoadProjects,
  ProjectsActionTypes,
  SelectProject,
} from "libs/core-data/src/lib/state/projects/projects.actions";
import { initialProjects } from "libs/core-data/src/lib/state/projects/projects.reducer";
import { selectAllProjects, selectCurrentProject } from "libs/core-data/src/lib/state";



@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject$: Observable<Project>;
  currentProject: Project;

  constructor(
    private customerService: CustomersService,
    private ns: NotificationsService,
    private facade: ProjectsFacade
  ) {
    this.projects$ = this.facade.projects$;
    this.currentProject$ = this.facade.currentProject$;
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.facade.resetCurrentProject();
  }

  selectProject(project) {
    this.facade.selectProject(project);
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.facade.getProjects();
    // this.projects$ = this.projectsService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.facade.createProject(project);
    this.ns.emit("Project created!");
    this.getProjects();
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.facade.updateProject(project);

    this.ns.emit("Project updated!");
    this.getProjects();
    this.resetCurrentProject();

    // this.projectsService.update(project)
    //   .subscribe(response => {
    //     this.ns.emit('Project saved!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   });
  }

  deleteProject(project) {  
    this.facade.deleteProject(project);
    this.ns.emit("Project deleted!");
    this.getProjects();
    this.resetCurrentProject();

    // this.projectsService.delete(project)
    //   .subscribe(response => {
    //     this.ns.emit('Project deleted!');
    //     this.getProjects();
    //     this.resetCurrentProject();
    //   });
  }
}
