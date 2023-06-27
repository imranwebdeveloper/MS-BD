import { MetaData } from "@/lib/metaData";
import React from "react";
export const metadata = MetaData.Disclaimer;

const Disclaimer = () => {
  return (
    <section className="layout container">
      <article className="bg-white rounded-md border my-4 p-4  md:p-20 flex flex-col gap-4 max-w-3xl mx-auto leading-5">
        <header className="text-center">
          <h1 className="text-primary-text-light">Disclaimer</h1>
          <h2 className="font-bold">About the information on this site</h2>
        </header>
        <main className="flex flex-col gap-4 text-justify">
          <p>
            The information contained on this website is for general information
            purposes only. While we endeavor to keep the information up to date
            and correct, we make no representations or warranties of any kind,
            express or implied, about the completeness, accuracy, reliability,
            suitability or availability with respect to the website or the
            information, products, services, or related graphics contained on
            the website for any purpose. Any reliance you place on such
            information is therefore strictly at your own risk.
          </p>
          <p>
            In no event will we be liable for any loss or damage including
            without limitation, indirect or consequential loss or damage, or any
            loss or damage whatsoever arising from loss of data or profits
            arising out of, or in connection with, the use of this website.
          </p>
          <p>
            Through this website you are able to link to other websites which
            are not under our control. We have no control over the nature,
            content and availability of those sites. The inclusion of any links
            does not necessarily imply a recommendation or endorse the views
            expressed within them.
          </p>
          <p>
            Every effort is made to keep the website up and running smoothly.
            However, we take no responsibility for, and will not be liable for,
            the website being temporarily unavailable due to technical issues
            beyond our control.
          </p>
          <p>
            If a particular specification is vital to you, we always recommend
            checking with the phone seller and the best way to start is by
            visiting their website directly.
          </p>
        </main>
      </article>
    </section>
  );
};

export default Disclaimer;
