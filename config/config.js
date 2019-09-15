"use strict";

const PAGE_CONGRESS_MEMBERS = {
  name: "congressMember",
  query: ".diputadoDetalles > .diputados-foto-detalles",
  props: [
    {
      name: "memberImage",
      query: "a > img",
      attrs: ["src", "alt"]
    },
    {
      name: "memberName",
      query: ".caption-detalle-horizontal-diputados > a"
    },
    {
      name: "memberParty",
      query:
        ".bandera-flotante-diputados-departamentos > img.diputadoBanderaDepartamento",
      attrs: ["src", "alt"]
    }
  ]
};

module.exports = {
  ROOT_DOMAIN: "www.asamblea.gob.sv",
  ROOT_PROTOCOL: "https",

  PAGES_COLLECTION: [
    {
      name: "congressMembers",
      endpoint: "diputados",
      collections: [PAGE_CONGRESS_MEMBERS]
    }
  ]
};
