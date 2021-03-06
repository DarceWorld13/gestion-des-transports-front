
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TechComponent } from './tech/tech.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DateValidatorDirective } from './validators/date-validator';
import { StatutConnecteService } from "./auth/statut-connecte.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { ReservationComponent } from './reservation/reservation.component';
import { CreationReservationComponent } from './creation-reservation/creation-reservation.component';
import { ImmatriculationValidatorDirective } from './validator/immatriculation-validator.directive';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { AnnonceCreationCovoiturageComponent } from './annonce-creation-covoiturage/annonce-creation-covoiturage.component';
import { FilterPipe } from './filter.pipe';
import { CycleVieVehiculeComponent } from './vehicule-gestion/cycle-vie-vehicule/cycle-vie-vehicule.component';
import { LireReservationComponent } from './lire-reservation/lire-reservation.component';
import { VehiculeGestionComponent } from './vehicule-gestion/vehicule-gestion.component';
import { PhotoUrlValidatorDirective } from './validator/photo-url-validator.directive';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AnnonceListeCovoiturageComponent } from './annonce-liste-covoiturage/annonce-liste-covoiturage.component';
import { AccueilAdministrateurComponent } from './accueil-administrateur/accueil-administrateur.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AccueilChauffeurComponent } from './accueil-chauffeur/accueil-chauffeur.component';
import { AccueilCollaborateurComponent } from './accueil-collaborateur/accueil-collaborateur.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PlanningComponent } from './planning/planning.component';
registerLocaleData(localeFr);


const routes: Routes = [
  { path: 'connexion', component: AuthComponent },

  { path: '', redirectTo: 'collaborateur/accueil', pathMatch: 'full' },
  {
    path: '',
    canActivate: [StatutConnecteService],
    children: [
      { path: 'collaborateur/reservations/creer', component: ReservationComponent },
      { path: 'collaborateur/reservations', component: LireReservationComponent },
      { path: 'collaborateur/annonces', component: AnnonceListeCovoiturageComponent },
      { path: 'collaborateur/annonces/creer', component: AnnonceCreationCovoiturageComponent },
      { path: 'admin/vehicules', component: VehiculeGestionComponent },
      { path: 'admin/chauffeur', component: ChauffeurComponent },
      { path: 'admin/vehicules/:immatriculation', component: CycleVieVehiculeComponent },
      { path: 'admin/accueil', component: AccueilAdministrateurComponent },
      { path: 'collaborateur/accueil', component: AccueilCollaborateurComponent },
      { path: 'chauffeur/accueil', component: AccueilChauffeurComponent },
      { path: 'chauffeur/planning', component: PlanningComponent },
      { path: 'error', component: ErrorPageComponent }
    ]
  }

];

@NgModule({
  declarations: [
    AppComponent,
    TechComponent,
    AuthComponent,
    PlanningComponent,
    ReservationComponent,
    LireReservationComponent,
    AnnonceCreationCovoiturageComponent,
    CreationReservationComponent,
    VehiculeGestionComponent,
    PhotoUrlValidatorDirective,
    ImmatriculationValidatorDirective,
    DateValidatorDirective,
    ChauffeurComponent,
    FilterPipe,
    CycleVieVehiculeComponent,
    AnnonceListeCovoiturageComponent,
    AccueilAdministrateurComponent,
    AccueilChauffeurComponent,
    AccueilCollaborateurComponent,
    ErrorPageComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
