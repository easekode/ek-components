import { Address } from './address';
import { Image } from './common';

export interface Config {
  websiteName?: string;
  websiteTagline?: string;
  websiteUrl?: string;
  websiteDescription?: string;
  logo?: Image;
  logoSecondary?: Image;
  addressTitle?: string;
  address?: Address;
  emailTitle?: string;
  email?: string;
  mobileTitle?: string;
  mobile?: string;
  whatsAppMessage?: string;
}
