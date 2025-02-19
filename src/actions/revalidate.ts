"use server"

import { revalidatePath, revalidateTag } from "next/cache"

export default async function triggerISR(props: any) {

    if (!props.draft) return

    console.log(props.draft)

    if (props.type == "viewport") {
        console.log(`Revalidating ... ${props.draft.dimensionValue.current}/[customer]`)
        revalidatePath(`/${props.draft.dimensionValue.current}/[customer]`, "page")
        console.log(`Revalidated ... ${props.draft.dimensionValue.current}/[customer]`)
    } 
    if (props.type == "campaign") {
        console.log(`Revalidating ... ${props.draft._id.split(".")[1]}`)
        revalidateTag(props.draft._id.split(".")[1])
        console.log(`Revalidated ... ${props.draft._id.split(".")[1]}`)
    }

}