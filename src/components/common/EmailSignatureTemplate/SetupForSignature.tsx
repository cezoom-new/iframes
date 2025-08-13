export default function SetupForSignature() {
  return (
    <div className="max-w-2xl mx-auto pt-6">
      <h2 className="text-base font-bold text-gray-800">
       Instructions to Set Up Your Email Signature
      </h2>

      <div className="pt-4">
        <h3 className="text-base font-semibold text-gray-900">
          Step 1: Copy Your Signature
        </h3>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>Fill in your details if needed.</li>
          <li>
            Click <strong>"Copy Signature"</strong>.
          </li>
        </ul>
      </div>

      <div className="pt-4">
        <h3 className="text-base font-semibold text-gray-900">
          Step 2: Open Gmail Settings
        </h3>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>Open Gmail.</li>
          <li>
            Click the ⚙️ <strong>Settings</strong> icon &gt;{" "}
            <strong>See all settings</strong>.
          </li>
          <li>
            Scroll to the <strong>Signature</strong> section.
          </li>
        </ul>
      </div>

      <div className="pt-4">
        <h3 className="text-base font-semibold text-gray-900">
          Step 3: Paste Your Signature
        </h3>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>
            Click <strong>"Create new"</strong> and give it a name (e.g.{" "}
            <em>"Work"</em>).
          </li>
          <li>
            Paste your copied signature into the box (<kbd>Ctrl + V</kbd> or{" "}
            <kbd>Cmd + V</kbd>).
          </li>
          <li>Set it as default for new emails and replies.</li>
          <li>
            Scroll down and <strong>Save Changes</strong>.
          </li>
        </ul>
      </div>

      <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-md mt-4">
        ✅ <strong>You're done!</strong>
        <br />
        Compose a new email to make sure the signature appears correctly.
      </div>

      <div className="text-sm text-gray-500 mt-2">
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
