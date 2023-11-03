import { Random } from "random-js";

export const generateRandomNumber = (min: number, max: number): number => {
  const random = new Random(); // uses the nativeMath engine
  const value = random.integer(min, max)
  return value
}

