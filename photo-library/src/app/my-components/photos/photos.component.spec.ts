import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosComponent } from './photos.component';
import { PhotoService } from 'src/app/service/photo-service';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let photoServiceMock: jasmine.SpyObj<PhotoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PhotoService', ['loadPhotos', 'addToFavorites']);
    await TestBed.configureTestingModule({
      declarations: [ PhotosComponent ],
      providers: [
        { provide: PhotoService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    photoServiceMock = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load photos on init', async () => {
    const mockPhotos = Array(6).fill(0).map((_, index) => ({
      id: index + 1,
      url: `https://picsum.photos/id/${index + 1}/200/300`,
      author: `Author ${index + 1}`,
      staticId: index + 1
    }));

    photoServiceMock.loadPhotos.and.returnValue(Promise.resolve(mockPhotos));

    component.ngOnInit();  // Trigger ngOnInit

    // Wait for promises to resolve
    await fixture.whenStable();

    // Ensure photos are loaded
    expect(component.photos.length).toBe(6);  // Add this expectation to ensure photos are loaded
    expect(component.photos[0].id).toBe(1);
  });

  it('should add a photo to favorites', () => {
    const photo = { id: 1, url: 'test', author: 'test author', staticId: 1 };
    component.addToFavorites(photo);
    expect(photoServiceMock.addToFavorites).toHaveBeenCalledWith(photo);
  });
});
