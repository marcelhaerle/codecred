import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <div className="pt-32 pb-12 max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold">Impressum (Legal Notice)</h1>

        <h2 className="text-2xl font-bold mt-8 mb-4">Angaben gemäß § 5 TMG (Information according to § 5 German Telemedia Act)</h2>

        <p className="mt-4 mb-4">
          This website and the services provided are operated by:
        </p>

        <p className="mt-4 mb-4">
          sonnvest GmbH<br />
          Sebastiansweg 37<br />
          88339 Bad Waldsee<br />
          Germany
        </p>

        <h3 className="text-xl font-bold mt-8 mb-4">Vertreten durch (Represented by):</h3>

        <p className="mt-4 mb-4">
          Marcel Härle, managing director<br />
          Carolin Härle, managing director
        </p>

        <h3 className="text-xl font-bold mt-8 mb-4">Kontakt (Contact):</h3>

        <p className="mt-4 mb-4">
          Email: <a href="mailto:marcel.haerle@sonnvest.de">marcel.haerle@sonnvest.de</a>
        </p>

        <h3 className="text-xl font-bold mt-8 mb-4">Umsatzsteuer-ID (VAT ID):</h3>

        <p className="mt-4 mb-4">
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE266413483
        </p>

        <h3 className="text-xl font-bold mt-8 mb-4">
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV (Responsible for the content
          according to § 55 Abs. 2 RStV):
        </h3>

        <p className="mt-4 mb-4">
          Marcel Härle<br />
          sonnvest GmbH<br />
          Sebastiansweg 37<br />
          88339 Bad Waldsee<br />
          Germany
        </p>

        <h3 className="text-xl font-bold mt-8 mb-4">EU-Streitschlichtung (EU Dispute Resolution)</h3>

        <p className="mt-4 mb-4">
          The European Commission provides a platform for online dispute resolution (ODR):
          https://ec.europa.eu/consumers/odr/. Our e-mail address can be found above in the site notice.
        </p>

        <p className="mt-4 mb-4">
          We are not willing or obliged to participate in dispute resolution proceedings before a
          consumer arbitration board.
        </p>
      </div>
      <Footer />
    </>

  );
}