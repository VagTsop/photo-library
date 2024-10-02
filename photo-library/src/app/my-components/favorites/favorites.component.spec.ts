import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/service/photo-service';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let photoServiceMock: jasmine.SpyObj<PhotoService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const photoServiceSpy = jasmine.createSpyObj('PhotoService', ['getFavorites']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ],
      providers: [
        { provide: PhotoService, useValue: photoServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    photoServiceMock = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites on init', () => {
    const mockFavorites = [{ id: 1, url: 'test', author: 'test author', staticId: 1 }];
    photoServiceMock.getFavorites.and.returnValue(mockFavorites);

    component.ngOnInit();
    expect(component.favorites.length).toBe(1);
    expect(component.favorites[0].id).toBe(1);
    expect(photoServiceMock.getFavorites).toHaveBeenCalled();
  });

  it('should navigate to photo details on view photo', () => {
    const mockPhoto = { id: 1, staticId: 1 };
    component.viewPhoto(mockPhoto);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/photos', mockPhoto.staticId]);
  });
});
