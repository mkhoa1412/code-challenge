/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js will invalidate the cache when a

import { ICurrency } from "@/app/containers/Swap/store/type";
import { NextResponse } from "next/server";

// request comes in, at most once every 60 seconds.
export const revalidate = 60;
 
export async function GET() {
  const data = await fetch('https://interview.switcheo.com/prices.json')
  const posts = await data.json();
  return NextResponse.json(
    posts?.filter((obj1: ICurrency, i: number, arr: ICurrency[]) => 
      arr.findIndex((obj2: ICurrency) => (obj2.currency === obj1.currency)) === i
    )?.map((item: any, index: number) => {
      return {
        currency: item?.currency,
        index: `currency-index-${index}`,
        image: `./icons/${item.currency}.svg`,
      }
    })
  );
}

export async function POST(req: Request) {
  const data = await fetch('https://interview.switcheo.com/prices.json')
  const posts = await data.json();

  const { payload } = await req.json();
  
  return NextResponse.json(
    posts?.filter((item: ICurrency) => item.currency === payload)?.map((item: any, index: number) => {
      return {
        ...item,
        index: `currency-index-${index}`,
        image: `./icons/${item.currency}.svg`,
      }
    })
  );
}
