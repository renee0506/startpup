import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { User } from '../user.model';
import { Need } from '../need.model';
import { SocialMedia } from '../social-media.model';
import { Contact } from '../contact.model';
import { Project } from '../project.model';

import { ProjectService } from '../project.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  providers: [UserService, ProjectService]
})
export class UserDetailComponent implements OnInit {
  public projects: FirebaseObjectObservable<any[]>;
  public users: FirebaseObjectObservable<any[]>;
  public userId: string; //user object key
  public userToDisplay;
  public showEditor = false; //user displayed on page

  constructor(
    public projectService: ProjectService,
    public userService: UserService,
    public route: ActivatedRoute,
    public location: Location
  ) { };

  ngOnInit() {
    this.route.params.forEach((url) => {
      this.userId = url['id'];
    });

    this.userToDisplay = this.userService.getUserById(this.userId).subscribe(dataLastEmittedFromObserver => {

      setTimeout(() => {
        this.userToDisplay = dataLastEmittedFromObserver;
      }, 3);

      console.log(this.userToDisplay);
    });
  }

  showEditUser() {
    this.showEditor = true;
  }
}
