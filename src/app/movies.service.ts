import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Location {
    address: string;
    latitude: string;
    longitude: string;
}

export interface Movie {
    title: string;
    releaseYear: number;
    funFacts: string;
    productionCompany: string;
    distributor: string;
    director: string;
    writer: string;
    actor1: string;
    actor2: string;
    actor3: string;
    state: string;
    city: string;
    locations: Location[];
}

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    private apiUrl = 'http://apimovies.runasp.net/api/movies';

    constructor(private http: HttpClient) {}

    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiUrl}`);
    }

    searchMovies(query: string): Observable<Movie[]> {
      return this.http.get<Movie[]>(`${this.apiUrl}/search?query=${query}`);
  }

  searchMovieTitles(query: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search-titles?query=${query}`);
}

}
