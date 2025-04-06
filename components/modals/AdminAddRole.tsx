import React from "react";
import ModalLayout from "./ModalLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import LottonownoWInputField from "../inputs/LottoInputField";
import LottonownoButton from "../buttons/LottonownoButton";
import { addNewRole, updateRole } from "@/hooks/useUsers";
import { toast } from "sonner";
import { usePermission } from "@/hooks/usePermission";
import { useRole } from "@/hooks/userRole";

interface AddRoleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setShowAddPermission: (open: boolean) => void;
  selectedRole?: any;
}

interface FormValues {
  title: string;
  description: string;
  permissions: any[];
}

function AdminAddRoleModal({
  open,
  setOpen,
  setShowAddPermission,
  selectedRole,
}: AddRoleProps) {
  const { data: permissions } = usePermission();
  const { refetch: refechRoles } = useRole();
  console.log(selectedRole, "THE SELECTEDDD OOOO");

  const addRoleHandler = async (values: any) => {
    let res: any;
    if (selectedRole?.id) {
      res = await updateRole(selectedRole.id, values);
    } else {
      res = await addNewRole(values);
    }

    if (res) {
      if (selectedRole?.id) {
        toast.success("Role Updated Successfully");
      } else {
        toast.success("Role Added Successfully");
      }
      refechRoles();
      setOpen(false);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        title: selectedRole?.title || "",
        description: selectedRole?.description || "",
        permissions: selectedRole?.permissions || [],
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Role title is required"),
        description: Yup.string().required("Role description is required"),
        permissions: Yup.array().min(1, "At least one permission is required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await addRoleHandler(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        setValues,
      }) => (
        <ModalLayout
          // maxWidth="max-w-md"
          title={selectedRole?.id ? "Edit Role" : "Add Role "}
          open={open}
          setOpen={setOpen}
        >
          <div className="flex flex-col justify-center items-center mb-10">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              {selectedRole?.id ? "Edit Role" : "Add New Role "}
            </h3>
            <p className="mt-2 text-sm text-[#667085]">
              Fill in the details below and add a new role
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-4">
              <div className="border p-2 rounded-md">
                <LottonownoWInputField
                  label="Role Title"
                  name={"title"}
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  error={errors.title}
                  placeholder="Enter Role title"
                />

                <LottonownoWInputField
                  label="Role Description"
                  name={`description`}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  error={errors.description}
                  placeholder="Enter Role Description"
                />

                <div className="mt-5">
                  <p className="block text-sm font-medium leading-6 text-gray-900">
                    Select Permissions
                  </p>
                  {/* <div className="grid grid-cols-3 gap-4">
                    {permissions?.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex text-xs rounded-md border px-2 py-1 items-center space-x-3"
                      >
                        <input
                          type="checkbox"
                          name={`permissions`}
                          value={item}
                          checked={values.permissions.some(
                            (perm) => perm.id === item.id
                          )}
                          // checked={values.permissions.includes(item)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                              // Add the permission ID to the array
                              setValues({
                                ...values,
                                permissions: [...values.permissions, item],
                              });
                            } else {
                              // Remove the permission ID from the array
                              setValues({
                                ...values,
                                permissions: values.permissions.filter(
                                  (item) => item !== item
                                ),
                              });
                            }
                          }}
                          onBlur={handleBlur}
                        />
                        <label
                          htmlFor={`permissions`}
                          className="truncate w-full"
                        >
                          {item?.title}
                        </label>
                      </div>
                    ))}
                    <div
                      onClick={() => {
                        setOpen(false);
                        setShowAddPermission(true);
                      }}
                      className="flex cursor-pointer rounded-md justify-center text-2xl text-center border items-center space-x-3"
                    >
                      +
                    </div>
                  </div> */}
                  <div className="grid grid-cols-3 gap-4">
                    {permissions?.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex text-xs rounded-md border px-2 py-1 items-center space-x-3"
                      >
                        <input
                          type="checkbox"
                          name={`permissions`}
                          value={item}
                          checked={values.permissions.some(
                            (perm) => perm.id === item.id
                          )}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                              // Add the permission to the array
                              setValues({
                                ...values,
                                permissions: [...values.permissions, item],
                              });
                            } else {
                              // Remove the permission from the array
                              setValues({
                                ...values,
                                permissions: values.permissions.filter(
                                  (perm) => perm.id !== item.id
                                ),
                              });
                            }
                          }}
                          onBlur={handleBlur}
                        />
                        <label
                          htmlFor={`permissions`}
                          className="truncate w-full"
                        >
                          {item?.title}
                        </label>
                      </div>
                    ))}
                    <div
                      onClick={() => {
                        setOpen(false);
                        setShowAddPermission(true);
                      }}
                      className="flex cursor-pointer rounded-md justify-center text-2xl text-center border items-center space-x-3"
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end items-center space-x-3 mt-5">
              <LottonownoButton
                onClick={() => setOpen(false)} // Close the modal on cancel
                title={"Cancel"}
                bgColor="white"
                textColor="black"
              />
              <LottonownoButton
                disabled={isSubmitting || !isValid}
                onClick={handleSubmit}
                title={"Update"}
              />
            </div>
          </form>
        </ModalLayout>
      )}
    </Formik>
  );
}

export default AdminAddRoleModal;
