import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo-service';

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService); // Initialize the service
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load photos with correct structure', async () => {
    const photos = await service.loadPhotos();
    expect(photos.length).toBe(6);
    expect(photos[0].id).toBeDefined();
    expect(photos[0].url).toBeDefined();
    expect(photos[0].author).toBeDefined();
  });

  it('should add to favorites', () => {
    // Mock localStorage with an empty array initially
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([])); // Ensure it returns an empty array stringified
    spyOn(localStorage, 'setItem'); // Spy on setItem to track updates

    // The photo object must have both id and staticId
    const photo = { id: 1, staticId: 101, author: 'Author 101', url: 'https://picsum.photos/id/101/200/300' };

    service.addToFavorites(photo); // Call the method

    const favorites = service.getFavorites(); // Get updated favorites
    console.log("Favorites after add:", favorites); // LOG: Show updated favorites

    expect(favorites.length).toBe(1); // Expect the array to have one photo now
    expect(favorites[0].staticId).toBe(101); // Expect the correct staticId
    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify(favorites)); // Check if localStorage was updated
  });

  it('should remove a photo from favorites', () => {
    // Mock localStorage with one photo in the favorites list
    const mockFavorites = [{ id: 1, staticId: 101, author: 'Author 101', url: 'https://picsum.photos/id/101/200/300' }];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockFavorites)); // Mock localStorage with one favorite
    spyOn(localStorage, 'setItem'); // Spy on setItem to track updates

    service.removeFromFavorites(1); // Remove the photo by id

    const updatedFavorites = service.getFavorites(); // Get updated favorites list
    console.log('Favorites after remove:', updatedFavorites); // Log after removal

    expect(updatedFavorites.length).toBe(0); // Expect the list to be empty
    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([])); // Expect localStorage to be updated
  });

  it('should get photo by ID from favorites', () => {
    const photo = { id: 1, staticId: 101, author: 'Author 101', url: 'https://picsum.photos/id/101/200/300' };
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([photo]));

    const fetchedPhoto = service.getPhotoById(1);
    expect(fetchedPhoto).toBeDefined();
    expect(fetchedPhoto.id).toBe(1);
  });
});
