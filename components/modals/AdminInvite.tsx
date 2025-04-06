import React from "react";
import ModalLayout from "./ModalLayout";
import { Formik, FieldArray, FormikErrors } from "formik";
import * as Yup from "yup";
import LottonownoWInputField from "../inputs/LottoInputField";
import LottonownoButton from "../buttons/LottonownoButton";
import SelectInputField from "../inputs/SelectInputField";
import { inviteAdmin } from "@/hooks/useUsers";
import { toast } from "sonner";
import { useRole } from "@/hooks/userRole";

interface AddEditGamesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface Admin {
  email: string;
  role: string;
  fullName: any;
}

interface FormValues {
  admins: Admin[];
}

function AdminInviteModal({ open, setOpen }: AddEditGamesProps) {
  const { data: roles } = useRole();

  console.log(roles, "THE CUSSSTSTST");
  const inviteAdminHandler = async (values: any) => {
    const res = await inviteAdmin(values);
    if (res) {
      toast.success("Admins Invited Successfully");
      setOpen(false);
    }
  };
  return (
    <Formik<FormValues>
      initialValues={{
        admins: [
          {
            email: "",
            role: "",
            fullName: "",
          },
        ],
      }}
      validationSchema={Yup.object({
        admins: Yup.array().of(
          Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            role: Yup.string().required("Role is required"),
            fullName: Yup.string().required("Full name is required"),
          })
        ),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await inviteAdminHandler(values);
        setSubmitting(false);
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
          title="Admin Invitation"
          open={open}
          setOpen={setOpen}
        >
          <div className="flex flex-col justify-center items-center mb-10">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              Invite Admin
            </h3>
            <p className="mt-2 text-sm text-[#667085]">
              Fill in the details below to invite an admin
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <FieldArray name="admins">
              {({ push, remove }) => (
                <div className="grid grid-cols-1 gap-y-4">
                  {values.admins.map((admin, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <LottonownoWInputField
                        label="Full Name"
                        name={`admins[${index}].fullName`}
                        value={admin.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        error={
                          touched.admins?.[index]?.fullName &&
                          (errors.admins?.[index] as FormikErrors<Admin>)
                            ?.fullName
                        }
                        placeholder="Enter full name"
                      />

                      <LottonownoWInputField
                        label="Email"
                        name={`admins[${index}].email`}
                        value={admin.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        error={
                          touched.admins?.[index]?.email &&
                          (errors.admins?.[index] as FormikErrors<Admin>)?.email
                        }
                        placeholder="Enter email"
                      />

                      <SelectInputField
                        label={"Role"}
                        name={`admins[${index}].role`}
                        onChange={handleChange}
                        value={values.admins[index].role}
                        onBlur={handleBlur}
                        data={(roles || []).map((role: any) => ({
                          name: role.title,
                          id: role.title,
                        }))}
                      />

                      <div className="flex justify-end mt-2">
                        {values.admins.length > 1 && (
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="text-primary mt-4"
                    onClick={() =>
                      push({
                        email: "",
                        role: "Admin",
                        fullName: "",
                      })
                    }
                  >
                    + Add Another
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="w-full mt-5">
              <LottonownoButton
                disabled={isSubmitting || !isValid}
                onClick={handleSubmit}
                title={"Invite Admins"}
              />
            </div>
          </form>
        </ModalLayout>
      )}
    </Formik>
  );
}

export default AdminInviteModal;
