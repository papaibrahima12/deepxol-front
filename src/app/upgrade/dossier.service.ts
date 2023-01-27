import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dossier } from "app/interface/Dossier";
import axios from "axios";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DossierService {

    private _fetchedDossiers: BehaviorSubject<Dossier[] | null> = new BehaviorSubject(null)
    private _fetchedStatistics: BehaviorSubject<any | null> = new BehaviorSubject(null)

    
    constructor(
        private _httpClient: HttpClient
    ) { }


    /**
     * Getter for fetchedNodes
     */
     get fetchedNodes$(): Observable<Dossier[]> {
        return this._fetchedDossiers.asObservable()
    }
    /**
     * Getter for fetchedNodes
     */
     get fetchedStatistics$(): Observable<any> {
        return this._fetchedStatistics.asObservable()
    }

    createDossier(data) {
        console.log(data)
        return this._httpClient.post(`${environment.apiUrl}/api/dossier`, data)
    }

    getAllDossier(): Observable<Dossier[]>{
        return this._httpClient.get<Dossier[]>(`${environment.apiUrl}/api/dossier`)
        .pipe(
            tap(nodes => this._fetchedDossiers.next(nodes)),
        )
    }

    getStatistic(): Observable<any>{
        return this._httpClient.get<any>(`${environment.apiUrl}/api/dossier/statistics`)
        .pipe(
            tap(payload => this._fetchedStatistics.next(payload)),
        )
    }
}