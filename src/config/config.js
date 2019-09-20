"use strict";

/**
 * The default template object to fetch information from a website
 */
const ENTITY_CONGRESS_MEMBERS = {
    name: "congressMember",
    query: ".diputadoDetalles > .diputados-foto-detalles",
    attrs: ["src", "alt"],
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
    /**
     * The domain part of the URL. Sample: www.google.com
     */
    ROOT_DOMAIN: "www.asamblea.gob.sv",
    /**
     * The protocol part of a URL. Sample http or https
     */
    ROOT_PROTOCOL: "https",

    /**
     * A collection of templates objects to fetch information from a website
     */
    PAGES_COLLECTION: [
        {
            name: "congressMembers",
            endpoint: "diputados",
            collections: [ENTITY_CONGRESS_MEMBERS]
        }
    ]
};
