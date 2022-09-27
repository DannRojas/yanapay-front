import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from '../login/services/auth.service';
import { UserModel } from '../domain/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );
  private url!: string;
  public title!: string;
  public currentUser!: UserModel;
  panelOpenState = false;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit(): void {
    this.url = this.router.url;
    this.currentUser = this.authService.getUserData()!;
    // this.user = this.authService.getCurrentUser();
    // this.router.events.subscribe((evt) => {
    //   this.url = this.router.url;
    //   this.onSetTitle();
    // });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
