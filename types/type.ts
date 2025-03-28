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

export interface Note {
    id: string;
    content: string;
    color: string; // Hex code like "#FEF08A"
    pinned: boolean;
    createdAt: string;
    userId: string;
}


export type Applications = {
    id: string;
    jobTitle: string;
    status: string;
    appliedDate?: Date;
    jobType: string;
    salary?: number;
    currency: string;
    jobUrl?: string;
    applicationSource: string;
    company: {
        id: string;
        name: string;
        logoUrl?: string;
    };
};

export interface Company {
    id: string,
    name: string;
    logoUrl: string;
}