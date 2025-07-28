import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function TermsOfUsePage() {
  return (
    <>
      <Header />
      <div className="pt-32 pb-12 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold">Terms of Use for CodeCred</h1>
        <h2 className="text-gray-500 text-sm">Last Updated: July 28, 2025</h2>

        <p className="mt-4 mb-4">Welcome to CodeCred! These Terms of Use (&quot;Terms&quot;) govern your access to and use of the CodeCred website,
          services, and applications (collectively, the &quot;Service&quot;). The Service is provided by sonnvest GmbH
          (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
        </p>

        <p className="mt-4 mb-4">
          Please read these Terms carefully. By creating an account or using the Service,
          you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Service Description</h2>

        <p className="mt-4 mb-4">CodeCred is a dynamic identity platform for technologists (&quot;you&quot;, &quot;user&quot;) It allows you
          to create a public profile that aggregates and showcases your professional work by connecting to third-party
          services like GitHub and content feeds.
        </p>

        <p className="mt-4 mb-4">
          The Service is offered in two ways:
        </p>

        <ul className="list-disc ml-8">
          <li>
            <b>Free, Self-Hosted Version:</b> An open-source version of the core application that you can host on your own
            infrastructure. Its use is governed by the applicable open-source license.
          </li>
          <li>
            <b>Premium, Managed SaaS Version:</b> A paid subscription service where we manage the hosting, infrastructure,
            and provide additional features (&quot;Premium Service&quot;).
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. User Accounts</h2>

        <ul className="list-disc ml-8">
          <li>
            <b>Account Creation:</b> To use most features of the Service, you must register for an account.
            You can create an account using a third-party service like GitHub OAuth. By using a third-party service,
            you authorize us to access and use certain account information from that service, as permitted by that
            service and our Privacy Policy.
          </li>
          <li>
            <b>Account Responsibility:</b> You are responsible for all activities that occur under your account.
            You agree to keep your account credentials confidential and to notify us immediately of any unauthorized
            use of your account.
          </li>
          <li>
            <b>Accuracy:</b> You agree to provide true, accurate, and complete information when creating and
            maintaining your account.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. User Content</h2>

        <ul className="list-disc ml-8">
          <li>
            <b>Your Content:</b> You retain ownership of all the content you post, upload, or display on your CodeCred
            profile, including links, text, images, and project descriptions (&quot;User Content&quot;).
          </li>
          <li>
            <b>License to Us:</b> By providing User Content, you grant us a worldwide, non-exclusive, royalty-free
            license to host, display, reproduce, and distribute your User Content solely for the purpose of operating,
            providing, and promoting the Service.
          </li>
          <li>
            <b>Responsibility:</b> You are solely responsible for your User Content and you represent that you have
            all necessary rights to post it and to grant us the license above.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Acceptable Use</h2>

        <p className="mt-4 mb-4">You agree not to use the Service to:</p>

        <ul className="list-disc ml-8">
          <li>
            Post or transmit any content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.
          </li>
          <li>
            Violate the intellectual property rights or privacy rights of any third party.
          </li>
          <li>
            Engage in any activity that could harm, disable, overburden, or impair the Service.
          </li>
          <li>
            Attempt to gain unauthorized access to any part of the Service or its related systems.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Services</h2>

        <p className="mt-4 mb-4">The core functionality of CodeCred relies on integrations with third-party services and APIs,
          such as GitHub. You acknowledge that:
        </p>

        <ul className="list-disc ml-8">
          <li>
            The Service&apos;s ability to display data from these services depends on their continued availability
            and the terms of their APIs.
          </li>
          <li>
            We are not responsible for the data, products, or services offered by these third parties.
          </li>
          <li>
            Your relationship with any third-party service is governed by your agreement with that service.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Fees and Payment for Premium Service</h2>

        <ul className="list-disc ml-8">
          <li>
            <b>Subscriptions:</b> The Premium Service is offered on a subscription basis. By signing up for a
            subscription, you agree to pay the applicable fees.
          </li>
          <li>
            <b>Billing:</b> We use a third-party payment processor (e.g., Stripe) to bill you. The processing of
            payments will be subject to the terms and policies of the payment processor.
          </li>
          <li>
            <b>Cancellation:</b> You can cancel your subscription at any time through your account settings.
            The cancellation will take effect at the end of the current billing period. Fees are non-refundable.
          </li>
          <li>
            <b>Price Changes:</b> We reserve the right to change our subscription fees. We will provide you with
            reasonable prior notice of any price changes.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>

        <ul className="list-disc ml-8">
          <li>
            <b>Our IP:</b> The Service, including its &quot;look and feel&quot; source code (for the non-open-source parts),
            trademarks, and logos, are the exclusive property of sonnvest GmbH and its licensors.
          </li>
          <li>
            <b>Open Source:</b> The free, self-hosted version of CodeCred is made available under an open-source license.
            That license governs your right to use, modify, and distribute that specific code.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Termination</h2>

        <ul className="list-disc ml-8">
          <li>
            <b>By You:</b> You may terminate these Terms at any time by deleting your account from your account settings.
          </li>
          <li>
            <b>By Us:</b> We may suspend or terminate your access to the Service at any time, with or without cause or
            notice, for any reason, including if we believe you have violated these Terms.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">9. Disclaimers and Limitation of Liability</h2>

        <ul className="list-disc ml-8">
          <li>
            <b>&quot;AS IS&quot; Service:</b> The Service is provided &quot;as is&quot; and &quot;as available&quot; without
            any warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted,
            secure, or error-free.
          </li>
          <li>
            <b>Limitation of Liability:</b> To the fullest extent permitted by law, in no event shall sonnvest GmbH
            be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related
            to your use of the Service. Our total liability to you for any claims arising from the use of the Service is
            limited to the greater of (a) the amount you paid us in the 12 months preceding the claim, or (b) 100 EUR.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">10. Governing Law and Jurisdiction</h2>

        <p className="mt-4 mb-4">
          These Terms shall be governed by the laws of the Federal Republic of Germany, without regard to its conflict
          of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located in
          Ravensburg, Germany.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to Terms</h2>

        <p className="mt-4 mb-4">
          We may modify these Terms from time to time. If we make material changes, we will notify you by email or by
          posting a notice on the Service. Your continued use of the Service after the effective date of the new Terms
          constitutes your acceptance of the changes.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact & Legal Notice (Impressum)</h2>

        <p className="mt-4 mb-4">
          According to § 5 TMG (German Telemedia Act), the provider of this service is:
        </p>

        <p className="mt-4 mb-4">
          sonnvest GmbH<br />
          Sebastiansweg 37<br />
          88339 Bad Waldsee<br />
          Germany<br />
        </p>

        <p className="mt-4 mb-4">
          Contact:<br />
          Email: <a href="mailto:marcel.haerle@sonnvest.de">marcel.haerle@sonnvest.de</a><br />
        </p>

        <p className="mt-4 mb-4">
          VAT ID (USt-IdNr.): DE266413483<br />
        </p>
      </div>
      <Footer />
    </>
  );
}
