"use client";
import React, { useState } from "react";
import ArrayInput from "@/components/admin/form/mobile/ArrayInput";
import Input from "@/components/admin/form/mobile/Input";
import InputFile from "@/components/admin/form/mobile/InputFile";
import MobileFormValidator from "@/components/admin/form/mobile/MobileFormValidator";
import Select from "@/components/admin/form/mobile/Select";
import VariantInput from "@/components/admin/form/mobile/VariantInput";
import Accordion from "@/components/admin/shared/Accordion";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
import LoadingSmall from "../../shared/LoadingSmall";
// import { useAddNewMobileMutation } from "@/redux/api/adminApiSlice";
import { headers } from "@/lib/fetchHeader";
// import { setMobile } from "@/redux/slices/mobileSlice";

const FormWrapper = () => {
  // const newMobile = useSelector((state: RootState) => state.mobileInfo);
  const dispatch = useDispatch();
  const [img, setImg] = useState("");
  const [csv, setCsv] = useState("");
  const [loading, setLoading] = useState(false);

  // const [addNewMobile] = useAddNewMobileMutation();

  const CSVHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", csv);
    const res = await fetch(`${process.env["API_URL"]}/upload/csv`, {
      method: "POST",
      body: formData,
      headers: headers,
    });
    const { data } = await res.json();
    // dispatch(setMobile(data));
    setLoading(false);
  };

  const saveNewMobile = async () => {
    try {
      if (img) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", img);
        const res = await fetch(`${process.env["API_URL"]}/upload/mobile`, {
          method: "POST",
          body: formData,
          headers: headers,
        });
        const { data } = await res.json();
        // await addNewMobile({ ...newMobile, imgUrl: data.img_url });
        // toast.success("New Mobile added successfully");
        setLoading(false);
      } else {
        // toast.error("Mobile image required");
      }
    } catch (error: any) {
      setLoading(false);
      // toast.error(error.data?.message?.[0]);
    }
  };

  return (
    <div></div>
    //     <>
    //       <div
    //         className={`flex items-center justify-between bg-white p-4 rounded-md gap-4 mb-4`}
    //       >
    //         <div className="flex items-center">
    //           <label className="min-w-[100px]">Upload CSV File</label>
    //           <input
    //             type="file"
    //             className="w-full border p-3 outline-none "
    //             onChange={(e) => setCsv(e.target.files?.[0] as any)}
    //             accept=".csv"
    //             required
    //           />
    //         </div>
    //         {/* {loading ? (
    //           <LoadingSmall />
    //         ) : (
    //           < className="btn-primary" onClick={CSVHandler}>
    //             Process Fil['
    //           </']button>
    //         )} */}
    //       </div>

    //       <div className=" mb-2 flex justify-end gap-4">
    //         {loading ? (
    //           <LoadingSmall />
    //         ) : (
    //           <button className="btn-primary" onClick={saveNewMobile}>
    //             Submit
    //           </button>
    //         )}
    //       </div>
    //       <Accordion heading="General Info">
    //         <>
    //           <div className="mt-3 mb-4  grid grid-cols-2 gap-2">
    //             <Select
    //               identity="brandName"
    //               title="Brand"
    //               options={[
    //                 "Apple",
    //                 "Samsung",
    //                 "Google",
    //                 "OnePlus",
    //                 "Huawei",
    //                 "Sony",
    //                 "LG",
    //                 "Motorola",
    //                 "Nokia",
    //                 "Realme",
    //                 "Oppo",
    //                 "Vivo",
    //                 "Xiaomi",
    //                 "Asus",
    //                 "ZTE",
    //                 "HTC",
    //                 "HP",
    //                 "Honor",
    //                 "Gionee",
    //                 "Infinix",
    //                 "Intex",
    //                 "Lava",
    //                 "Lenovo",
    //                 "Meizu",
    //                 "Micromax",
    //                 "Microsoft",
    //                 "Panasonic",
    //                 "Philips",
    //                 "Razer",
    //                 "Spice",
    //                 "TCL",
    //                 "Tecno",
    //                 "Toshiba",
    //               ]}
    //             />
    //             <Select
    //               identity="category"
    //               title="Mobile Type"
    //               options={["Smartphones", "Tablets", "Feature Phones"]}
    //             />
    //             <Input label="Model" name="model" />
    //             <Input label="Date" type="date" name="releasedDate" />
    //             <InputFile setImg={setImg} />
    //             <Input label="Network" name="networkBrands" />
    //             <Input label="SIM type" name="simType" />
    //           </div>
    //           <MobileFormValidator
    //             twoColumnContent={[
    //               {
    //                 title: "Brand",
    //                 content: newMobile.brandName,
    //               },
    //               {
    //                 title: "Category",
    //                 content: newMobile.category,
    //               },
    //               {
    //                 title: "Model",
    //                 content: newMobile.model,
    //               },
    //               {
    //                 title: "Release Date",
    //                 content: newMobile.releasedDate,
    //               },
    //               {
    //                 title: "Network",
    //                 content: newMobile.networkBrands,
    //               },
    //               {
    //                 title: "SIM Type",
    //                 content: newMobile.simType,
    //               },
    //             ]}
    //           />
    //         </>
    //       </Accordion>
    //       <Accordion heading="Body Info">
    //         <>
    //           <div className="mt-3 mb-2  grid grid-cols-2 gap-2">
    //             <Input label="Dimension" name="dimension" />
    //             <Input label="Weight" name="weight" />
    //             <Input label="Build" name="build" />
    //             <Input label="Screen size" name="screenSize" />
    //             <Input label="Screen type" name="screenType" />
    //             <Input label="Resolution" name="resolution" />
    //           </div>
    //           <Input label="Protection" name="protection" />

    //           <div className="mt-4">
    //             <MobileFormValidator
    //               fullWidthContent={[
    //                 {
    //                   title: "Protection",
    //                   content: newMobile.protection,
    //                 },
    //               ]}
    //               twoColumnContent={[
    //                 {
    //                   title: "Dimension",
    //                   content: newMobile.dimension,
    //                 },
    //                 {
    //                   title: "Weight",
    //                   content: newMobile.weight,
    //                 },
    //                 {
    //                   title: "Build",
    //                   content: newMobile.build,
    //                 },
    //                 {
    //                   title: "Screen size",
    //                   content: newMobile.screenSize,
    //                 },
    //                 {
    //                   title: "Screen type",
    //                   content: newMobile.screenSize,
    //                 },
    //                 {
    //                   title: "Resolution",
    //                   content: newMobile.resolution,
    //                 },
    //               ]}
    //             />
    //           </div>
    //         </>
    //       </Accordion>
    //       <Accordion heading="Camera Info">
    //         <>
    //           <ArrayInput label="Main" name="mainCamera" />
    //           <Input label="Features" name="mainFeatures" />
    //           <ArrayInput label="Front " name="fontCamera" />
    //           <Input label="Features" name="frontFeatures" />

    //           <div className="mt-4">
    //             <MobileFormValidator
    //               fullWidthContent={[
    //                 {
    //                   title: "Main Features",
    //                   content: newMobile.mainFeatures,
    //                 },
    //                 {
    //                   title: "Font Features",
    //                   content: newMobile.frontFeatures,
    //                 },
    //               ]}
    //               ArrayContent={[
    //                 {
    //                   title: "Main Camera",
    //                   content: [...newMobile.mainCamera],
    //                 },
    //                 {
    //                   title: "Font Camera",
    //                   content: [...newMobile.fontCamera],
    //                 },
    //               ]}
    //             />
    //           </div>
    //         </>
    //       </Accordion>
    //       <Accordion heading="Basic Info">
    //         <>
    //           <VariantInput name="variant" />
    //           <div className="mt-3 mb-2  grid grid-cols-2 gap-2">
    //             <Input label="ROM Options" name="romOption" />
    //             <Input label="RAM Options" name="ramOption" />
    //             <Input label="SD Card" name="sdCard" />
    //             <Input label="OS" name="os" />
    //             <Input label="Fingerprint" name="fingerprint" />
    //             <Input label="Processor" ['ame']="processor" ['>']
    //             <Input label="CPU" name="cpu" />
    //             <Input label="GPU" name="gpu" />
    //             <Input label="Battery" name="battery" />
    //             <Input label="PORT" name="port" />
    //             <Input label="Audio Jack" name="audioJack" />
    //             <Input label="Sound" name="sound" />
    //           </div>
    //           <ArrayInput label="Charging" name="charging" />
    //           <Input label="Color Variant " name="color" />

    //           <div className="mt-4">
    //             <MobileFormValidator
    //               fullWidthContent={[
    //                 {
    //                   title: "Color Variant",
    //                   content: newMobile.color,
    //                 },
    //               ]}
    //               twoColumnContent={[
    //                 {
    //                   title: "ROM Options",
    //                   content: newMobile.romOption,
    //                 },
    //                 {
    //                   title: "RAM Options",
    //                   content: newMobile.ramOption,
    //                 },
    //                 {
    //                   title: "SD Card",
    //                   content: newMobile.sdCard,
    //                 },
    //                 {
    //                   title: "OS",
    //                   content: newMobile.os,
    //                 },
    //                 {
    //                   title: "Fingerprint",
    //                   content: newMobile.fingerprint,
    //                 },
    //                 {
    //                   title: "Processor",['                  content']: newMobile.processor,
    // ['               },']
    //                 {
    //                   title: "CPU",
    //                   content: newMobile.cpu,
    //                 },
    //                 {
    //                   title: "GPU",
    //                   content: newMobile.gpu,
    //                 },
    //                 {
    //                   title: "Battery",
    //                   content: newMobile.battery,
    //                 },
    //                 {
    //                   title: "PORT",
    //                   content: newMobile.port,
    //                 },
    //                 {
    //                   title: "Audio Jack",
    //                   content: newMobile.audioJack,
    //                 },
    //                 {
    //                   title: "Sound",
    //                   content: newMobile.sound,
    //                 },
    //               ]}
    //               ArrayContent={[
    //                 {
    //                   title: "Charging",
    //                   content: [...newMobile.charging],
    //                 },
    //                 {
    //                   title: "Variants",
    //                   content: [
    //                     ...newMobile.variant.map(
    //                       (item: any) => `${item.rom}/${item.ram} GB,`
    //                     ),
    //                   ],
    //                 },
    //               ]}
    //             />
    //           </div>
    //         </>
    //       </Accordion>
    //       <Accordion heading="Connectivity">
    //         <>
    //           <div className="mt-3 mb-2  grid grid-cols-2 gap-2">
    //             <Input label="Wi-Fi" name="wifi" />
    //             <Input label="Bluetooth" name="bluetooth" />
    //             <Input label="GPS" name="gps" />
    //             <Input label="OTG" name="otg" />
    //             <Input label="FM" name="fm" />
    //             <Input label="NFC" name="nfc" />
    //           </div>

    //           <MobileFormValidator
    //             twoColumnContent={[
    //               {
    //                 title: "Wi-Fi",
    //                 content: newMobile.wifi,
    //               },
    //               {
    //                 title: "Bluetooth",
    //                 content: newMobile.bluetooth,
    //               },
    //               {
    //                 title: "GPS",
    //                 content: newMobile.gps,
    //               },
    //               {
    //                 title: "OTG",
    //                 content: newMobile.otg,
    //               },
    //               {
    //                 title: "FM",
    //                 content: newMobile.fm,
    //               },
    //               {
    //                 title: "NFC",
    //                 content: newMobile.nfc,
    //               },
    //             ]}
    //           />
    //         </>
    //       </Accordion>
    //       <Accordion heading="Features">
    //         <>
    //           <div className="mt-2">
    //             <Input label="Sensor" name="sensor" />
    //             <ArrayInput label="Others" name="others" />
    //           </div>

    //           <div className="mt-4">
    //             <MobileFormValidator
    //               fullWidthContent={[
    //                 {
    //                   title: "Sensor",
    //                   content: newMobile.sensor,
    //                 },
    //               ]}
    //               ArrayContent={[
    //                 {
    //                   title: "Other",
    //                   content: [...newMobile.others],
    //                 },
    //               ]}
    //             />
    //           </div>
    //         </>
    //       </Accordion>
    //       <Accordion heading="Others">
    //         <>
    //           <ArrayInput label="In The Box" name="inTheBox" />

    //           <div className="mt-4">
    //             <MobileFormValidator
    //               ArrayContent={[
    //                 {
    //                   title: "In The Box",
    //                   content: [...newMobile.inTheBox],
    //                 },
    //               ]}
    //             />
    //           </div>
    //         </>
    //       </Accordion>
    //     </>
  );
};

export default FormWrapper;
