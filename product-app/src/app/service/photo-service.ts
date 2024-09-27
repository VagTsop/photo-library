// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class PhotoService {
//   private readonly favoritesKey = 'favorites';

//   constructor() {}

//   // Fetch photos with a fixed URL for the current page (this is unrelated to favorites)
//   loadPhotos(currentPage: number): Promise<any[]> {
//     return new Promise((resolve) => {
//       const randomDelay = Math.random() * 100 + 200;
//       setTimeout(() => {
//         const newPhotos = Array(6).fill(0).map((_, index) => ({
//           id: currentPage * 6 + index,
//           url: `https://picsum.photos/200/300?random=${currentPage * 6 + index}`, // Fixed URL per image
//           author: `Author ${Math.floor(Math.random() * 1000)}`,
//           staticId: currentPage * 6 + index,
//         }));
//         resolve(newPhotos);
//       }, randomDelay);
//     });
//   }

//   // Retrieve favorites from localStorage
//   getFavorites(): any[] {
//     const storedFavorites = localStorage.getItem(this.favoritesKey);
//     return storedFavorites ? JSON.parse(storedFavorites) : [];
//   }

//   // Add a photo to the favorites in localStorage
//   addToFavorites(photo: any): void {
//     let favorites = this.getFavorites();
//     const isAlreadyFavorite = favorites.some((fav) => fav.staticId === photo.staticId);
//     if (!isAlreadyFavorite) {
//       favorites.push(photo);
//       localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
//     }
//   }

//   // Remove a photo from the favorites by ID
//   removeFromFavorites(photoId: number): void {
//     let favorites = this.getFavorites();
//     favorites = favorites.filter((fav) => fav.id !== photoId);
//     localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
//   }
// }
