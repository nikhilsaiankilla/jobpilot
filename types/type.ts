import { ElementType } from "react";

export type FeatureType = {
    title: string;
    description: string;
    icon: ElementType;
};

export type TestimonialType = {
    id: number,
    name: string,
    text: string,
    rating: number,
    avatar: string,
}