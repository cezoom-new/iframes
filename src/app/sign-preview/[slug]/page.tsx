import { runQuery } from "@/sanity/lib/client";
import { getAllEmailSignatures, getEmailSignatureBySlug } from "@/sanity/lib/queries";
import { unstable_cache } from "next/cache";

const fetchAllEmailSignatures = unstable_cache(async ()=>{
  const signatures:any = await runQuery(getAllEmailSignatures());
  return signatures
})

const fetchEmailSignatureBySlug = unstable_cache(async (slug)=>{
  const signatures:any = await runQuery(getEmailSignatureBySlug(),{slug},[slug]);
  return signatures
})


export async function generateStaticParams() {
  const signatures:any = await fetchAllEmailSignatures();
  const allParams: any = [];

      signatures?.forEach((signature: { slug: any; }) => {
        allParams.push(
         signature.slug
        );
      });
    
  
    return allParams;
}
export default async function emailSignature({ params }: { params: any }) {
  const { slug } = await params;
  const signature = await fetchEmailSignatureBySlug(slug);
  console.log({signature});
  return(<>HI</>)
}
