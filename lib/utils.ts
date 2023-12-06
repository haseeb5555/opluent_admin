import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import nodemailer from "nodemailer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export  const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: 'haseebmoon666@gmail.com',
      pass: 'nfby uysy cesm loot'
  }
});


