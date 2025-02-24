"use client";

export default async function triggerISR(props: any) {
  if (!props.draft) return;

  if (props.type == "viewport") {
    await fetch(`${process.env.PROJECT_URL}/api/revalidate`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "authorization": `Bearer ${process.env.REVALIDATE_SECRET}`,
      },
      method: "POST",
      body: JSON.stringify({ tag: props.draft.dimensionValue.current }),
    });
  }
  if (props.type == "campaign") {
    await fetch(`${process.env.PROJECT_URL}/api/revalidate`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "authorization": `Bearer ${process.env.REVALIDATE_SECRET}`,
      },
      method: "POST",
      body: JSON.stringify({ tag: props.draft._id.split(".")[1] }),
    });
  }
}
