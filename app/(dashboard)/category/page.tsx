"use client";

import React, { useState } from "react";
import LottonownoButton from "@/components/buttons/LottonownoButton";
import CategoryCard from "@/components/cards/CategoryCard";
import AddEditCategory from "@/components/modals/AddEditCategory";
import { deleteCategory, useCategory } from "@/hooks/useCategory";
import LottoLoader from "@/components/loader/LottoLoader";
import BackButton from "@/components/buttons/BackButton";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { toast } from "sonner";
function DrawCategory() {
  const { data: categories, isLoading, refetch } = useCategory();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deactivateCategory = async () => {
    await deleteCategory(selectedCategory?.id);
    toast.success("Category deleted successfully");
    setShowDeleteModal(false);
    refetch();
  };

  return (
    <section>
      <BackButton />
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-extrabold text-primary-100">
            Game Categories
          </h2>
        </div>
        <LottonownoButton
          title="Add Category"
          onClick={function (): void {
            setSelectedCategory(null);
            setOpen(true);
          }}
        />
      </div>

      {isLoading && <LottoLoader />}

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {categories &&
          categories?.map((category: any, index: number) => (
            <div
              onClick={() => {
                setSelectedCategory(category);
                setOpen(true);
              }}
              key={index}
            >
              <CategoryCard
                name={category?.name}
                image={category?.imageUrl}
                games={"4 Games"}
              />
            </div>
          ))}
      </div>

      {open && (
        <AddEditCategory
          selectedCategory={selectedCategory}
          showDeleteModal={
            selectedCategory
              ? () => setShowDeleteModal(true)
              : () => setShowDeleteModal(false)
          }
          open={open}
          setOpen={setOpen}
        />
      )}

      <ConfirmModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone"
        proceedHandler={deactivateCategory}
      />
    </section>
  );
}

export default DrawCategory;
