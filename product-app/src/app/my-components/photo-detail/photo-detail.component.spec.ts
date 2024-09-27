import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoDetailComponent } from './photo-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from 'src/app/service/photo-service';

describe('PhotoDetailComponent', () => {
  let component: PhotoDetailComponent;
  let fixture: ComponentFixture<PhotoDetailComponent>;
  let photoServiceMock: jasmine.SpyObj<PhotoService>;
  let routerMock: jasmine.SpyObj<Router>;
  let routeMock: any;

  beforeEach(async () => {
    const photoServiceSpy = jasmine.createSpyObj('PhotoService', ['getPhotoById', 'removeFromFavorites']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routeMock = { snapshot: { paramMap: { get: () => '1' }}};

    await TestBed.configureTestingModule({
      declarations: [ PhotoDetailComponent ],
      providers: [
        { provide: PhotoService, useValue: photoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoDetailComponent);
    component = fixture.componentInstance;
    photoServiceMock = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load a photo on init', () => {
    const mockPhoto = { id: 1, url: 'test', author: 'test author', staticId: 1 };
    photoServiceMock.getPhotoById.and.returnValue(mockPhoto);

    component.ngOnInit();
    expect(component.photo).toBe(mockPhoto);
    expect(photoServiceMock.getPhotoById).toHaveBeenCalledWith(1);
  });

  it('should remove a photo from favorites', () => {
    const mockPhoto = { id: 1, staticId: 1 };
    component.photo = mockPhoto;

    component.removeFromFavorites();
    expect(photoServiceMock.removeFromFavorites).toHaveBeenCalledWith(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/favorites']);
  });
});
