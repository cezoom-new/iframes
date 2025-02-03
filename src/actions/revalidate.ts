"use server"

import { revalidatePath, revalidateTag } from "next/cache"

export default async function triggerISR(props: any) {

    if (!props.draft) return

    if (props.type == "viewport") {
        revalidatePath(`/${props.draft.dimensionValue.current}/[customer]`, "page")
    } 
    if (props.type == "campaign") {
        revalidateTag(props.draft._id.split(".")[1])
    }

}