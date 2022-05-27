import { Photo } from '../models/photo.model';

export const photosProviders = [
  {
    provide: 'PHOTOS_REPOSITORY',
    useValue: Photo,
  },
];