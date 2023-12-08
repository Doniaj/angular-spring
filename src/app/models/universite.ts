import { Foyer } from "./foyer";

export class Universite {
    idUniversite!: number;
    nomUniversite!: string;
    adresse!: string;
    image!: string;
    foyer!: Foyer;  // Assuming a direct one-to-one relationship with Foyer
selectedFoyer: any;
}
