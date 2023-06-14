import React from "react";
import { MetaData } from "@/lib/metaData";
export const metadata = MetaData.Privacy;

const Privacy = () => {
  return (
    <section className="layout container">
      <article className="bg-primary-bg-light rounded-md border my-4 p-4  md:p-20 flex flex-col gap-4 max-w-3xl mx-auto leading-5">
        <header className="text-center">
          <h1 className="text-primary-text-light">Privacy Policy</h1>
        </header>
        <main className="flex flex-col gap-4 text-justify">
          <p>
            We respect the privacy of our visitors and are committed to
            protecting their personal information. This privacy policy explains
            how we collect, use, and protect the information we collect from our
            visitors.
          </p>
          <div>
            <h2 className="font-bold text-base">Information we collect</h2>
            <p>
              We may collect personal information from our visitors, such as
              name, email address, and phone number. We may also collect
              non-personal information such as browser type, and operating
              system.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-base"> How we use information</h2>
            <p>
              We may use the information we collect to improve our website and
              services, to personalize the user experience, and to communicate
              with our visitors. We may also use the information to provide
              targeted advertising.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-base"> Information sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer personal information
              to third parties unless we provide users with advance notice. This
              does not include website hosting partners and other parties who
              assist us in operating our website, conducting our business, or
              serving our users.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-base"> Advertising</h2>
            <p>
              We use cookies and other tracking technologies to collect
              information about your browsing behavior for advertising purposes.
              We may display advertisements on our website from third-party
              advertising companies. These companies may use cookies to display
              targeted ads that may be of interest to you. By using our website,
              you consent to the use of cookies for advertising purposes.
            </p>
            <p className="mt-2">
              In addition, we may use Google AdSense to display ads on our
              website. Google uses cookies to serve ads based on a user&apos;s
              prior visits to our website or other websites. You may opt out of
              personalized advertising by visiting Google&apos;s Ads Settings.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-base"> Third-party links</h2>
            <p>
              Our website may contain links to third-party websites. We have no
              control over the content or privacy policies of these websites and
              are not responsible for their practices.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-base"> Security</h2>
            <p>
              We take reasonable measures to protect the personal information of
              our visitors, including the use of encryption and firewalls.
              However, no security system is foolproof, and we cannot guarantee
              the security of our website or the information we collect.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-base"> Changes to this policy </h2>
            <p>
              We may update this privacy policy from time to time. Any changes
              will be posted on this page. If you have any questions about this
              privacy policy, please contact us at{" "}
              <strong className="text-sm">emrannazir002@gmail.com</strong>.
            </p>
          </div>
        </main>
      </article>
    </section>
  );
};

export default Privacy;
