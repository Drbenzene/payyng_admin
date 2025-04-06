"use client";
import React, { useEffect, useState } from "react";
import LottonownowTable from "@/components/table/LottonownowTable";
import { useRouter } from "next/navigation";
import { useUsers, getUsers } from "@/hooks/useUsers";
import moment from "moment";
import AdminInviteModal from "@/components/modals/AdminInvite";
import AdminAddRoleModal from "@/components/modals/AdminAddRole";
import AddNewPermission from "@/components/modals/AddNewPermission";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { deleteRole, useRole } from "@/hooks/userRole";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { toast } from "sonner";
import BackButton from "@/components/buttons/BackButton";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import { useUserStat } from "@/hooks/useUserStat";
import { convertArrayOfObjectsToWorksheet } from "@/utils/helperFunc";
import FilterSearchModal from "@/components/modals/FilterModal";

const columns = [
  {
    Header: "Player Name",
    accessor: "fullName",
  },
  {
    Header: "Player ID",
    accessor: "playerId",
  },
  {
    Header: "Email Address",
    accessor: "email",
  },
  {
    Header: "Player Status",
    accessor: "status",
  },
  {
    Header: "Date Joined",
    accessor: "createdAt",
  },
];

function Page() {
  const { data: roles, refetch: refechRoles } = useRole();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<any>({
    role: "Regular",
  });

  const { push } = useRouter();
  const [activeTab, setActiveTab] = useState("Players");
  const { data: users, isLoading, refetch } = useUsers(filters);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showAddPermission, setShowAddPermission] = useState(false);
  const [showDeleteRole, setShowDeleteRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const { data: userStat } = useUserStat();
  const [processing, setProcessing] = useState(false);

  const menuOptions = [
    {
      name: "View",
      action: (item: any) => {
        push(`/users/${item?.id}`);
      },
    },
  ];

  const stats = [
    { name: "Total Users", stat: `${userStat?.totalUsers || "--"}` },
    { name: "Verified Users", stat: `${userStat?.verifiedUsers || "--"}` },
    { name: "Unverified Users", stat: `${userStat?.unverifiedUsers || "--"}` },
  ];

  const nextPageHandler = (page: any) => {
    setFilters({
      ...filters,
      page,
    });
  };

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const deleteRoleHandler = async () => {
    const res = await deleteRole(selectedRole?.id);
    if (res) {
      setShowDeleteRole(false);
      refechRoles();
      toast.success("Role Deleted Successfully");
    }
  };

  const downloadDataHandler = async () => {
    setProcessing(true);
    const allUsers = await getUsers({
      isExport: true,
      ...filters,
    });
    setProcessing(false);
    const modifiedData = allUsers?.map((item: any) => ({
      "Full Name": `${item?.firstName} ${item?.lastName}`,
      Email: item?.email,
      "Phone number": item?.phoneNumber,
      "Date Of Birth": moment(item?.dateOfBirth).format("Do MMM YYYY"),
      "Player ID": item?.playerId,
      "Verification Status": item?.isVerified ? "Verified" : "Unverified",
      "Joined On": moment(item?.createdAt).format("Do MMM YYYY"),
      Status: item?.status,
    }));

    await convertArrayOfObjectsToWorksheet(
      modifiedData,
      `Users Report-${new Date().toDateString()}`
    );
    setProcessing(false);
    setOpen(false);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <BackButton />
        <LottonownoButton
          onClick={() => setOpen(true)}
          title={"Export Users"}
          disabled={processing}
          processing={processing}
        />
      </div>

      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="flex justify-between items-center w-full p-4 ">
        <p
          onClick={() => {
            setActiveTab("Players");
            setFilters({
              role: "Regular",
            });
          }}
          className={`cursor-pointer w-1/2 p-4 text-center ${
            activeTab === "Players"
              ? "bg-primary rounded-lg text-white"
              : "text-primary-200"
          }`}
        >
          Player Account
        </p>
        <p
          onClick={() => {
            setActiveTab("Admins");
            setFilters({
              role: "Admin",
            });
          }}
          className={`cursor-pointer w-1/2 p-4 text-center ${
            activeTab === "Admins"
              ? "bg-primary rounded-lg text-white"
              : "text-primary-200"
          }`}
        >
          Admin Account
        </p>
      </section>

      <section className="my-10">
        <LottonownowTable
          title={activeTab === "Players" ? "All Players" : "All Admin Users"}
          subTitle={"These are users that recently joined"}
          columns={columns}
          data={(users?.data || []).map((item: any) => ({
            ...item,
            fullName: `${item?.firstName} ${item?.lastName}`,
            status: `${
              item?.status === "SUSPENDED"
                ? "Suspended"
                : item?.isVerified
                ? "Verified"
                : "Unverified"
            }`,
            createdAt: moment(item?.createdAt).format("Do MMM YYYY"),
          }))}
          loading={isLoading}
          meta={users?.meta}
          nextPageHandler={nextPageHandler}
          menuOptions={menuOptions}
          OptionsComponents={
            activeTab === "Players" ? null : () => <OptionsComponents />
          }
          showSearch={true}
          filters={filters}
          setFilters={setFilters}
        />

        {activeTab === "Admins" && (
          <>
            <div className="flex  justify-between items-center mt-5">
              <div>
                <p className="px-4 py-2 font-extrabold">
                  Roles and Permissions
                </p>
                <p className="px-4 py-2 text-[#667085]">
                  Manage your roles for team members and account permissions
                  here.
                </p>
              </div>

              <div className="flex space-x-5">
                <button
                  className="px-4 py-2 text-[#D3790D] bg-[#FFFAF5] border rounded-md  "
                  onClick={() => {
                    setSelectedRole(null);
                    setShowAddRole(true);
                  }}
                >
                  + Add Role
                </button>

                <button
                  className="px-4 py-2 text-[#D3790D] bg-black border rounded-md  "
                  onClick={() => {
                    setSelectedRole(null);
                    setShowAddPermission(true);
                  }}
                >
                  + Add Permission
                </button>
              </div>
            </div>
            <div className="w-full gap-5 grid  grid-cols-1">
              {roles?.map((role: any) => (
                <div
                  key={role?.id}
                  className="w-full bg-white rounded-xl mb-3 mt-3 p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{role?.title} </p>
                      <p className="text-[#667085] text-sm">
                        {role?.description}
                      </p>
                    </div>
                    <div className=" space-x-5 flex justify-center items-center">
                      <CiEdit
                        onClick={() => {
                          setSelectedRole(role);
                          setShowAddRole(true);
                        }}
                        size={20}
                        className="cursor-pointer"
                      />
                      <MdDeleteOutline
                        onClick={() => {
                          setSelectedRole(role);
                          setShowDeleteRole(true);
                        }}
                        size={20}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-wrap mt-4 space-x-4">
                    {role?.permissions?.map((item: any) => (
                      <p
                        key={item.id}
                        className="px-4 py-2 rounded-md bg-[#F8F9FF] text-[#4D526D] text-sm"
                      >
                        {item?.title}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {showAddRole && (
        <AdminAddRoleModal
          setShowAddPermission={setShowAddPermission}
          open={showAddRole}
          setOpen={setShowAddRole}
          selectedRole={selectedRole}
        />
      )}
      {showAddPermission && (
        <AddNewPermission
          open={showAddPermission}
          setOpen={setShowAddPermission}
        />
      )}

      {showDeleteRole && (
        <ConfirmModal
          open={showDeleteRole}
          setOpen={setShowDeleteRole}
          title={"Delete Role"}
          message={`Are you sure you want to delete ${selectedRole?.title} role?`}
          proceedHandler={deleteRoleHandler}
        />
      )}

      {open && (
        <FilterSearchModal
          open={open}
          setOpen={setOpen}
          proceedHandler={downloadDataHandler}
          filters={filters}
          setFilters={setFilters}
          processing={processing}
        />
      )}
    </div>
  );
}

export default Page;

function OptionsComponents() {
  const [showInviteAdmin, setShowInviteAdmin] = useState(false);
  return (
    <>
      <div className="w-auto flex justify-start  space-x-4  items-center rounded-lg ">
        <button
          className="px-4 py-2 border rounded-md  "
          onClick={() => {
            setShowInviteAdmin(true);
          }}
        >
          Invite Admin
        </button>
      </div>

      {showInviteAdmin && (
        <AdminInviteModal open={showInviteAdmin} setOpen={setShowInviteAdmin} />
      )}
    </>
  );
}
