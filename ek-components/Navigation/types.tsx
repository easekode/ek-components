export interface NavigationLink {
  name: string;
  id: string;
  url?: string;
  children?: NavigationLink[];
}

export interface NavigationProps {
  signUpBtnLabel: string;
}
