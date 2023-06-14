import { ReduxProviders } from "@/providers/ReduxProvider";
import FormWrapper from "@/components/admin/form/mobile/FormWrapper";
import { Metadata } from "next";
import { MetaData } from "@/lib/metaData";
export const metadata: Metadata = MetaData.Admin.Mobiles.Add;

const AddNew = async () => {
  return (
    <section className="mx-auto mb-4 max-w-4xl">
      <ReduxProviders>
        <FormWrapper />
      </ReduxProviders>
    </section>
  );
};

export default AddNew;
