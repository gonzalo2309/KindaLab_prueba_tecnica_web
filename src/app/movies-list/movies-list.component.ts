import {  Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoviesService, Movie } from '../movies.service';
import { Router } from '@angular/router';
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-movies-list',
    standalone: true,
    imports: [CommonModule, FormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule,], // Agrega FormsModule aquí
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.scss']

})
export class MoviesListComponent  implements OnInit {

  movies: Movie[] = [];
  filteredMovies: any[] = [];
  query: string = '';
  error: string | null = null;
  selectedMovie: Movie | null = null;
  loading: boolean = false;

  constructor(private moviesService: MoviesService, private router: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loading = false;
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita el comportamiento por defecto si es necesario
      this.searchMovies(); // Llama a la función de búsqueda
    }
  }
  searchMovies(): void {
      if (!this.query.trim()) {
          this.error = 'Please enter a search term.';
          this.movies = [];
          return;
      }

      this.error = null;
      this.loading = true;
      this.moviesService.searchMovies(this.query).subscribe({
          next: (data) => {
              this.movies = data;
              this.loading = false;
              if (this.movies.length === 0) {
                  this.error = 'No movies found for your search.';
              }
          },
          error: (err) => {
              this.error = 'Error searching for movies.';
              this.loading = false;
          },
      });
  }

  showDetails(movie: Movie): void {
      this.dialog.open(MovieDetailModalComponent, {
          data: { movie },
          width: '90vw',
          height: '90%',
          maxWidth: '1200px',
      });
  }

  onSearchChange(): void {
    if (!this.query.trim()) {
      this.movies = [];
      this.filteredMovies = [];
      return;
    }

    // Llamada al servicio para obtener títulos
    this.moviesService.searchMovieTitles(this.query).subscribe({
      next: (titles) => {
        console.log(titles);
        this.filteredMovies = titles; // Actualiza las sugerencias
      },
      error: (err) => {
        console.error('Error fetching movie titles:', err);
        this.filteredMovies = []; // Manejo del error
      },
    });
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.query = event.option.value; // Actualiza el query con el valor seleccionado
    this.searchMovies(); // Llama al método de búsqueda completa
  }
}
