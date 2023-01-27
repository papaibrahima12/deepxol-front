import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Dossier } from "app/interface/Dossier";
import { DossierService } from "app/upgrade/dossier.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DashboardResolver implements Resolve<any> {

    /**
     * Constructor
     */
    constructor(private dossierService: DossierService)
    { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.dossierService.getStatistic()
    }
}
