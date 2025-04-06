import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import LottonownoWInputField from "../inputs/LottoInputField";
import LottonownoButton from "../buttons/LottonownoButton";
import LottonownowImageUpload from "../inputs/LottonownowImageUpload";
import LottoNowNowCurrencyField from "../inputs/LottoNowNowCurrencyField";
import { FiUpload } from "react-icons/fi";
import { addCategory, updateCategory } from "@/hooks/useCategory";
import { toast } from "sonner";
import { useCategory } from "@/hooks/useCategory";
import Image from "next/image";

interface AddEditGamesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  showDeleteModal: (open: boolean) => void;
  selectedCategory?: any;
}

interface FormValues {
  name: string;
  image: string;
  stake: string;
}

function AddEditCategory({
  open,
  setOpen,
  selectedCategory,
  showDeleteModal,
}: AddEditGamesProps) {
  const [preview, setPreview] = useState<any>(selectedCategory?.imageUrl || "");
  const { refetch } = useCategory();

  const addCategoryHandler = async (values: FormValues, resetForm: any) => {
    let res: any;
    const payload = {
      ...values,
      stake: Number(values.stake),
    };
    if (selectedCategory?.id) {
      res = await updateCategory(payload, selectedCategory?.id);
    } else {
      res = await addCategory(payload);
    }
    if (res) {
      toast.success(
        `Category ${selectedCategory ? "Updated" : "Added"} successfully`
      );
      setOpen(false);
      refetch();
      resetForm();
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        name: selectedCategory?.name || "",
        stake: selectedCategory?.stake || "",
        image: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await addCategoryHandler(values, resetForm);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        setValues,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <ModalLayout
          maxWidth="max-w-xl"
          title={
            selectedCategory ? `Edit ${selectedCategory?.name}` : "Add Category"
          }
          open={open}
          setOpen={setOpen}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-2">
              <LottonownoWInputField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                error={errors.name}
                placeholder="Enter game name"
              />

              <LottoNowNowCurrencyField
                label="Stake Amount (NGN)"
                name="stake"
                value={values.stake}
                error={errors.stake}
                placeholder="Enter stake"
                setValues={setValues}
                values={values}
                touched={touched}
                id={"stake"}
              />

              <LottonownowImageUpload
                setPreview={setPreview}
                values={values}
                setValues={setValues}
                label="Category Image"
                required
                name="image"
                children={
                  <div className="w-full mt-1 h-80 rounded-lg bg-[#F6F6F7] border border-[#BFBFC0]">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="product"
                        className="w-full h-full object-cover"
                        height={100}
                        width={100}
                      />
                    ) : (
                      <div className=" flex flex-1 justify-center items-center mt-32">
                        <FiUpload color="#AAAAAA" size={50} />{" "}
                      </div>
                    )}
                  </div>
                }
              />
            </div>

            <div className="w-full mt-5">
              <LottonownoButton
                disabled={isSubmitting || !isValid}
                onClick={handleSubmit}
                processing={isSubmitting}
                title={selectedCategory ? "Update Category" : "Add Category"}
              />

              {selectedCategory && (
                <div className="mt-5">
                  {" "}
                  <LottonownoButton
                    onClick={async () => {
                      setOpen(false);
                      showDeleteModal(true);
                    }}
                    title="Delete Category"
                    bgColor="#000000"
                  />{" "}
                </div>
              )}
            </div>
          </form>
        </ModalLayout>
      )}
    </Formik>
  );
}

export default AddEditCategory;
