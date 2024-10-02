# Angular Photo Management Project

## Overview

This Angular project implements a simple photo management application that allows users to view photos, mark them as favorites, and manage their favorite photos. The application includes:

- A **Photos** page with infinite scroll.
- A **Favorites** page to view photos marked as favorites.
- A **Photo Details** page for viewing individual photos and removing them from favorites.
- Local storage management for storing and retrieving favorites.
- A simple UI built with Angular Material.

## Project Structure

- **Components:**
  - `<app-header></app-header>`: The header with navigation links to the Photos and Favorites pages.
  - `<router-outlet></router-outlet>`: Router outlet where the Photos, Favorites, and Photo Detail components are rendered.
  - **PhotosComponent**: Displays a grid of photos with infinite scroll.
  - **FavoritesComponent**: Shows photos marked as favorites.
  - **PhotoDetailComponent**: Displays details of a single photo, allowing the user to remove it from favorites.

- **Services:**
  - **PhotoService**: Manages loading photos, adding/removing photos from favorites, and retrieving data from localStorage.

