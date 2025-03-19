import { OrganisationLogo } from "./OrganisationLogo";

export type Organisation = {
  id: string;
  name: string;
  description: string;
  avatar_url: OrganisationLogo;
};
