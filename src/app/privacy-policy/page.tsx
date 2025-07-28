import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="pt-32 pb-12 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold">Privacy Policy (Datenschutzerklärung) for CodeCred</h1>
        <h2 className="text-gray-500 text-sm">Last Updated: July 28, 2025</h2>

        <p className="mt-4 mb-4">
          We take your privacy seriously. This Privacy Policy explains how sonnvest GmbH
          (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your personal
          data when you use our Service. We are committed to the principles of the EU General Data
          Protection Regulation (GDPR), or Datenschutz-Grundverordnung (DSGVO).
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Data Controller (Verantwortlicher)</h2>

        <p className="mt-4 mb-4">
          The entity responsible for the processing of your personal data is:
        </p>

        <p className="mt-4 mb-4">
          sonnvest GmbH<br />
          Sebastiansweg 37<br />
          88339 Bad Waldsee<br />
          Germany<br />
          Email: <a href="mailto:marcel.haerle@sonnvest.de">marcel.haerle@sonnvest.de</a>
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Data We Collect and Why</h2>

        <p className="mt-4 mb-4">
          We adhere to the principle of data minimization. We only collect data that is necessary to provide
          and improve our Service.
        </p>

        <ul className="list-disc ml-8">
          <li>
            <b>When you visit our website:</b>
            <ul className="list-disc ml-8">
              <li>
                <b>Server Log Files:</b> Our hosting provider automatically collects information such as your
                IP address, browser type, operating system, referrer URL, and time of the request. This data is
                not merged with other data sources and is used for ensuring the security and stability of the
                Service. The legal basis is our legitimate interest (Art. 6(1)(f) GDPR).
              </li>
              <li>
                <b>Analytics:</b> We use Vercel Web Analytics, a privacy-first analytics tool. This tool does
                not use cookies and does not track individual users. All data is aggregated and anonymized to
                help us understand user trends, such as page views and referrers.
              </li>
            </ul>
          </li>
          <li>
            <b>When you create a CodeCred Account:</b>
            <ul className="list-disc ml-8">
              <li>
                <b>GitHub Authentication:</b> We use GitHub OAuth for account creation. When you sign up,
                we request access to your basic profile information (e.g., GitHub username, profile picture)
                and public repository data. We only request the minimum necessary scopes (<i>read:user</i>,
                <i>public_repo</i>) to provide the core functionality of the Service. We do not request access
                to your private repositories or code.
              </li>
              <li>
                <b>Email Address:</b> We receive your primary email address from GitHub for account management,
                authentication, and essential service communications (e.g., security alerts).
              </li>
              <li>
                The legal basis for this processing is the <b>performance of a contract</b> (Art. 6(1)(b) GDPR) –
                we need this data to create and manage your account and provide the Service you signed up for.
              </li>
            </ul>
          </li>
          <li>
            <b>When you use the Service:</b>
            <ul className="list-disc ml-8">
              <li>
                <b>Profile Information:</b> Any additional information you add to your profile (links, project
                descriptions, etc.) is processed to display it on your public CodeCred page as requested by you.
                The legal basis is the performance of a contract (Art. 6(1)(b) GDPR).
              </li>
            </ul>
          </li>
          <li>
            <b>When you subscribe to the Premium Service:</b>
            <ul className="list-disc ml-8">
              <li>
                <b>Payment Information:</b> We use a third-party payment processor (e.g., Stripe) to handle payments.
                We do not store your credit card details. We receive transaction information (e.g., subscription
                status) from the processor to manage your premium account. The legal basis is the performance of a
                contract (Art. 6(1)(b) GDPR).
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Legal Basis for Processing (Rechtsgrundlagen)</h2>

        <p className="mt-4 mb-4">
          We process your data based on the following legal grounds under the GDPR:
        </p>

        <ul className="list-disc ml-8">
          <li>
            <b>Art. 6(1)(b) GDPR:</b> Processing is necessary for the performance of a contract with you
            (i.e., to provide the CodeCred Service).
          </li>
          <li>
            <b>Art. 6(1)(f) GDPR:</b> Processing is necessary for our legitimate interests, such as ensuring
            the security of our Service and understanding website traffic trends.
          </li>
          <li>
            <b>Art. 6(1)(a) GDPR:</b> Where applicable, we will ask for your explicit consent, for example,
            to send you marketing newsletters. You can withdraw this consent at any time.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Recipients and Transfers</h2>

        <p className="mt-4 mb-4">
          We do not sell your personal data. We may share your data with the following categories of service
          providers (data processors) who help us operate our Service:
        </p>

        <ul className="list-disc ml-8">
          <li>
            <b>Hosting and Analytics Provider:</b> We use Vercel, Inc. to host our website and database, and to
            provide web analytics.
          </li>
          <li>
            <b>Payment Processor:</b> (e.g., Stripe) to process payments for the Premium Service.
          </li>
          <li>
            <b>Third-Party APIs:</b> (e.g., GitHub) to fetch the public data you wish to display on your profile.
          </li>
        </ul>

        <p className="mt-4 mb-4">
          Many of these providers (like Vercel, Inc., GitHub, Inc., or Stripe, Inc.) are based in the United States.
          Data transfers to these providers are secured through appropriate safeguards, such as Standard Contractual
          Clauses (SCCs), to ensure a level of data protection compliant with EU law.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Retention (Speicherdauer)</h2>

        <p className="mt-4 mb-4">
          We store your personal data only for as long as it is necessary for the purposes for which it was collected.
        </p>

        <ul className="list-disc ml-8">
          <li>
            Your account data is retained as long as your account is active.
          </li>
          <li>
            If you delete your account, we will permanently and irreversibly erase your personal data from our
            production systems in a timely manner.
          </li>
          <li>
            We may retain certain data for longer periods if required by law (e.g., for tax and accounting purposes).
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights as a Data Subject (Ihre Rechte)</h2>

        <p className="mt-4 mb-4">
          Under the GDPR, you have the following rights regarding your personal data:
        </p>

        <ul className="list-disc ml-8">
          <li>
            <b>Right to Access (Art. 15 GDPR):</b> You can request a copy of the personal data we hold about you.
          </li>
          <li>
            <b>Right to Rectification (Art. 16 GDPR):</b> You can correct inaccurate or incomplete data through
            your account settings or by contacting us.
          </li>
          <li>
            <b>Right to Erasure / &quot;Right to be Forgotten&quot; (Art. 17 GDPR):</b> You can request the deletion
            of your personal data. This can be done directly by using the &quot;Delete Account&quot; feature in your
            settings.
          </li>
          <li>
            <b>Right to Restriction of Processing (Art. 18 GDPR):</b> You can request that we limit the processing
            of your data.
          </li>
          <li>
            <b>Right to Data Portability (Art. 20 GDPR):</b> You can request to receive your data in a
            machine-readable format.
          </li>
          <li>
            <b>Right to Object (Art. 21 GDPR):</b> You can object to the processing of your data based on
            legitimate interests.
          </li>
          <li>
            <b>Right to Lodge a Complaint (Art. 77 GDPR):</b> You have the right to lodge a complaint with a
            supervisory authority, in particular in the Member State of your habitual residence, place of work,
            or place of the alleged infringement. The competent authority for us is the Landesbeauftragte für den
            Datenschutz und die Informationsfreiheit Baden-Württemberg.
          </li>
        </ul>

        <p className="mt-4 mb-4">
          To exercise these rights, please use the tools provided in your account dashboard or contact us
          at marcel.haerle@sonnvest.de.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Data Security</h2>

        <p className="mt-4 mb-4">
          We implement appropriate technical and organizational measures to protect your personal data, including:
        </p>

        <ul className="list-disc ml-8">
          <li>
            Encryption of data in transit (TLS/SSL).
          </li>
          <li>
            Encryption of data at rest.
          </li>
          <li>
            Strict access controls to our systems.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes to this Privacy Policy</h2>

        <p className="mt-4 mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any significant changes by
          email or by posting a notice on our website.
        </p>
      </div>
      <Footer />
    </>
  );
}
