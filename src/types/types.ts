export interface IAlbum {
  id?: string;
  nameTrip: string;
  location: string;
  date: string;
  description?: string;
  coverImage: string;
  createdAt: any;
}

export interface IPhoto {
  id?: string;
  albumId: string;
  url: string;
  publicId: string;
  createdAt: any;
}
