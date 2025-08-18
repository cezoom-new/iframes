import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH4 } from "@/components/ui/h4";
import { TypographyP } from "@/components/ui/p";

export default function SetupForSignature({ id }: { id: string }) {
  return (
    <div className="pt-6" id={id}>
      <h2 className="text-base font-medium pb-7">
        Instructions to Set Up Your Email Signature
      </h2>
      <Card className="bg-slate-100 ">
        <CardContent className="px-4 py-0">
          <Accordion type="single" collapsible >
            <AccordionItem value="item-1">
              <AccordionTrigger> Step 1: Copy Your Signature</AccordionTrigger>
              <AccordionContent>
                <ul className=" ml-6 list-disc ">
                  <li>Fill in your details if needed.</li>
                  <li>
                    Click <strong>"Copy Signature"</strong>.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger> Step 2: Open Gmail Settings</AccordionTrigger>
              <AccordionContent>
                <ul className="ml-6 list-disc">
                  <li>Open Gmail.</li>
                  <li>
                    Click the ⚙️ <strong>Settings</strong> icon &gt;{" "}
                    <strong>See all settings</strong>.
                  </li>
                  <li>
                    Scroll to the <strong>Signature</strong> section.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger> Step 3: Paste Your Signature</AccordionTrigger>
              <AccordionContent>
                <ul className="ml-6 list-disc ">
                  <li>
                    Click <strong>"Create new"</strong> and give it a name (e.g.{" "}
                    <em>"Work"</em>).
                  </li>
                  <li>
                    Paste your copied signature into the box (
                    <kbd>Ctrl + V</kbd> or <kbd>Cmd + V</kbd>).
                  </li>
                  <li>Set it as default for new emails and replies.</li>
                  <li>
                    Scroll down and <strong>Save Changes</strong>.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger> Step 4: You're done! ✅</AccordionTrigger>
              <AccordionContent>
                <small className="text-sm leading-none font-medium">
                  Compose a new email to make sure the signature appears
                  correctly.
                </small>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-500 mt-5">
        Need help?{" "}
        <a
          href="https://support.google.com/mail/answer/8395?hl=en"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Check Gmail Signature Help
        </a>
        .
      </div>
    </div>
  );
}
