import React from "react";
import ModalLayout from "./ModalLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import LottonownoWInputField from "../inputs/LottoInputField";
import LottonownoButton from "../buttons/LottonownoButton";
import SelectInputField from "../inputs/SelectInputField";

interface FilterSearchModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  processing: boolean;
  filters: any;
  setFilters: (filters: any) => void;
  proceedHandler: any;
  selectData?: any[];
}

function FilterSearchModal({
  open,
  setOpen,
  setFilters,
  filters,
  processing,
  proceedHandler,
  selectData,
}: FilterSearchModalProps) {
  return (
    <Formik
      initialValues={{
        from: "",
        to: "",
        status: "",
      }}
      validationSchema={Yup.object({
        from: Yup.string().required("Required"),
        to: Yup.string().required("Required"),
        status: Yup.string().optional(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setFilters({
          ...filters,
          //   from: new Date(values?.from),
          //   to: new Date(values?.to),
          from: values?.from,
          to: values?.to,
        });
        await proceedHandler();
        setSubmitting(false);
        setOpen(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <ModalLayout
          maxWidth="max-w-md"
          title="Filter Export"
          open={open}
          setOpen={setOpen}
        >
          <form onSubmit={handleSubmit}>
            <LottonownoWInputField
              label="Start Date"
              name={"from"}
              value={values.from}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              error={touched.from && errors.from}
              placeholder="Select From Date"
            />

            <LottonownoWInputField
              label="End Date"
              name={"to"}
              value={values.to}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              error={touched.to && errors.to}
              placeholder="Select To Date"
              max={new Date().toISOString().split("T")[0]}
            />

            {selectData && (
              <SelectInputField
                label="Status"
                name={"status"}
                value={values.status}
                onChange={(e: any) => {
                  setFilters({ ...values, status: e.target.value });
                  handleChange(e);
                }}
                onBlur={handleBlur}
                error={touched.status && errors.status}
                data={selectData}
              />
            )}

            <div className="w-full mt-5">
              <LottonownoButton
                disabled={isSubmitting || !isValid || processing}
                onClick={handleSubmit}
                title={"Export"}
                processing={isSubmitting || processing}
              />
            </div>
          </form>
        </ModalLayout>
      )}
    </Formik>
  );
}

export default FilterSearchModal;
