import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {ChainDetailsMapDTO} from "../../models/api.model";
import {catchError, firstValueFrom} from "rxjs";
import {API_URL} from "../../constants";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
  }

  getChainList(): Promise<ChainDetailsMapDTO> {
    let params = new HttpParams();
    params = params.set('staging', true);
    return firstValueFrom(this._http.get<ChainDetailsMapDTO>(`${API_URL}token-info`, {params})
      .pipe(
        catchError(e => {
          if (e.error.statusCode === 500) {
            this._router.navigate([''], {queryParams: {}});
          }
          throw new Error(e.error.message);
        })
      ));
  };
}
