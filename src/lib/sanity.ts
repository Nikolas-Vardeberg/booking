import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    apiVersion: "v1",
    dataset: "production",
    projectId: "nloe04va",
    useCdn: false,
})

const builder = ImageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

