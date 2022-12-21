export class Products {
  constructor(
    public img: string,
    public title: string,
    public type: string,
    public year: number,
    public description: string,
    public prize: number,
    public active:boolean = false
  ) {}
}
