import { SpotType } from '../enums/spotType';
import { User } from './user';

export class Spot{
    id: number;
    spotType: SpotType;
    name: string;
    created_at: Date;
    edited_at: Date;
    description: string;
    likes: number;
    comments: number;
    user: User;
    security: number;
    lng: number;
    lat: number;
    images: string[];
}