"use client";

import UpdateInput from "./UpdateInput";
import UpdateArrayInput from "./UpdateArrayInput";
import { Phone } from "types";

interface Props {
  mobile: Phone;
}

const ContentUpdateFrom: React.FC<Props> = ({ mobile }) => {
  return (
    <div></div>
    // <section className="col-span-3 rounded border bg-white p-8">
    //   <UpdateInput
    //     info={mobile?.brandName}
    //     fieldName="brandName"
    //     title="Brand Name"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.model}
    //     fieldName="model"
    //     title="Model"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.releasedDate}
    //     fieldName="releasedDate"
    //     title="Rel. Date"
    //     id={mobile?._id}
    //     type="date"
    //   />
    //   <UpdateInput
    //     info={mobile?.networkBrands}
    //     fieldName="networkBrands"
    //     title="Network"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.simType}
    //     fieldName="simType"
    //     title="SIM Type"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.dimension}
    //     fieldName="dimension"
    //     title="Dimension"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.weight}
    //     fieldName="weight"
    //     title="Weight"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.build}
    //     fieldName="build"
    //     title="Build"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.screenSize}
    //     fieldName="screenSize"
    //     title="Screen Size"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.screenType}
    //     fieldName="screenType"
    //     title="Screen Type "
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.resolution}
    //     fieldName="resolution"
    //     title="Resolution"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.protection}
    //     fieldName="protection"
    //     title="Protection"
    //     id={mobile?._id}
    //   />

    //   <UpdateArrayInput
    //     info={mobile?.mainCamera}
    //     fieldName="mainCamera"
    //     title="Main Camera"
    //     id={mobile?._id}
    //   />
    //   <UpdateArrayInput
    //     info={mobile?.fontCamera}
    //     fieldName="fontCamera"
    //     title="Front Camera"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.mainFeatures}
    //     fieldName="mainFeatures"
    //     title="Main Features"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.frontFeatures}
    //     fieldName="frontFeatures"
    //     title="Front Features"
    //     id={mobile?._id}
    //   />
    //   <div className="flex gap-2 ">
    //     <UpdateInput
    //       info={mobile?.romOption}
    //       fieldName="romOption"
    //       title="ROM Opt."
    //       id={mobile?._id}
    //     />
    //     <UpdateInput
    //       info={mobile?.ramOption}
    //       fieldName="ramOption"
    //       title="RAM Opt."
    //       id={mobile?._id}
    //     />
    //   </div>
    //   <UpdateInput
    //     info={mobile?.sdCard}
    //     fieldName="sdCard"
    //     title="SD Card."
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.os}
    //     fieldName="os"
    //     title="OS"
    //     id={mobile?._id}
    //   />

    //   <UpdateInput
    //     info={mobile?.fingerprint}
    //     fieldName="fingerprint"
    //     title="Fingerprint"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.processor}
    //     fieldName="processor"
    //     title="Processor"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.cpu}
    //     fieldName="cpu"
    //     title="CPU"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.gpu}
    //     fieldName="gpu"
    //     title="GPU"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.port}
    //     fieldName="port"
    //     title="Port"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.sound}
    //     fieldName="sound"
    //     title="Sound"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.audioJack}
    //     fieldName="audioJack"
    //     title="Audio Jack"
    //     id={mobile?._id}
    //   />
    //   <UpdateInput
    //     info={mobile?.battery}
    //     fieldName="battery"
    //     title="Battery"
    //     id={mobile?._id}
    //   />
    //   <UpdateArrayInput
    //     info={mobile?.charging}
    //     fieldName="charging"
    //     title="Charging"
    //     id={mobile?._id}
    //   />

    //   <UpdateInput
    //     info={mobile?.color}
    //     fieldName="color"
    //     title="Color"
    //     id={mobile?._id}
    //   />
    //   <div className="flex gap-2">
    //     <UpdateInput
    //       info={mobile?.wifi}
    //       fieldName="wifi"
    //       title="Wifi"
    //       id={mobile?._id}
    //     />
    //     <UpdateInput
    //       info={mobile?.bluetooth}
    //       fieldName="bluetooth"
    //       title="Bluetooth"
    //       id={mobile?._id}
    //     />
    //   </div>

    //   <div className="flex gap-2">
    //     <UpdateInput
    //       info={mobile?.gps}
    //       fieldName="gps"
    //       title="GPS"
    //       id={mobile?._id}
    //     />
    //     <UpdateInput
    //       info={mobile?.otg}
    //       fieldName="otg"
    //       title="OTG"
    //       id={mobile?._id}
    //     />
    //   </div>
    //   <div className="flex gap-2">
    //     <UpdateInput
    //       info={mobile?.fm}
    //       fieldName="fm"
    //       title="FM"
    //       id={mobile?._id}
    //     />
    //     <UpdateInput
    //       info={mobile?.nfc}
    //       fieldName="nfc"
    //       title="NFC"
    //       id={mobile?._id}
    //     />
    //   </div>
    //   <UpdateInput
    //     info={mobile?.sensor}
    //     fieldName="sensor"
    //     title="Sensor"
    //     id={mobile?._id}
    //   />

    //   <UpdateArrayInput
    //     info={mobile?.others}
    //     fieldName="others"
    //     title="Others"
    //     id={mobile?._id}
    //   />
    //   <UpdateArrayInput
    //     info={mobile?.inTheBox}
    //     fieldName="inTheBox"
    //     title="In The Box"
    //     id={mobile?._id}
    //   />
    // </section>
  );
};

export default ContentUpdateFrom;
