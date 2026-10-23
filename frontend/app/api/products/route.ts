import { NextResponse } from "next/server";

import { Product } from "../../../types/Product";

const mockProducts: Product[] = [

  {

    id: 1,

    name: "Papel Toalha Scala 360 folhas",

    category: "Papel Toalha",

    description: "Papel Toalha Scala com 3 rolos de 120 folhas cada, totalizando 360 folhas. Ideal para uso doméstico e comercial, proporcionando absorção eficiente e praticidade no dia a dia.",

    price: 19.9,

    imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTPKvzEJWpZkWkoOGkEUI-_281riMn1ycrIyHmWbn7p0EWabOoRTvDdK9SXeQM_YiUCWQsuoQoBG8cLYjBL0af1eQwQGxbFjv_q8SCTde01YCsk2Gb4XQ",

  },

  {

    id: 2,

    name: "Papel Neve folha Tripla",

    category: "Papel Higiênico",

    description: "Papel Neve folha Tripla com 16 rolos de 30 metros cada, totalizando 480 metros. Proporciona maciez e resistência, garantindo conforto e higiene para toda a família.",

    price: 39.9,

    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsWNcb6wDCCWoPuAI_eA6RAf2t4CiVMfzAY7-1rOedCQ&s",

  },

];

export async function GET() {

  return NextResponse.json(mockProducts);

}