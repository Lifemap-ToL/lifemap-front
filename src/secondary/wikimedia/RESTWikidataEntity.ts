interface RESTWikidataEntitySiteLink {
  site: string;
  title: string;
  url: string;
}

export interface RESTWikidataEntity {
  entities: {
    [key: string]: {
      id: string;
      pageid: number;
      title: string;
      sitelinks: { [key: string]: RESTWikidataEntitySiteLink };
    };
  };
}
