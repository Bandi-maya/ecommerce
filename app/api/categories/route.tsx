import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/Category";
import { withAuth, UserPayload } from "@/lib/withAuth";
import { connectDB } from "@/lib/db";

/* ================= CREATE CATEGORY ================= */
async function createCategory(req: NextRequest, user: UserPayload|any) {
  await connectDB();

  if (user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { title, description, parentCategory } = await req.json();

  if (!title) {
    return NextResponse.json({ message: "Category title is required" }, { status: 400 });
  }

  if (parentCategory) {
    const parentExists = await Category.findById(parentCategory);
    if (!parentExists) {
      return NextResponse.json({ message: "Parent category not found" }, { status: 404 });
    }
  }

  const category = await Category.create({
    title,
    description,
    parentCategory: parentCategory || null
  });

  return NextResponse.json(category, { status: 201 });
}

/* ================= GET ALL CATEGORIES ================= */
async function getAllCategories(req: NextRequest) {
  await connectDB();

  const categories = await Category.aggregate([
    { $match: { parentCategory: null } },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "parentCategory",
        as: "subCategories"
      }
    }
  ]);

  return NextResponse.json(categories);
}

/* ================= UPDATE CATEGORY ================= */
async function updateCategory(req: NextRequest, user: UserPayload) {
  await connectDB();

  if (user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;

  const { title, description, parentCategory } = await req.json();

  const category = await Category.findById(id);
  if (!category) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  const updated = await Category.findByIdAndUpdate(
    id,
    { title, description, parentCategory: parentCategory || null },
    { new: true, runValidators: true }
  );

  return NextResponse.json(updated);
}

/* ================= DELETE CATEGORY ================= */
async function deleteCategory(req: NextRequest, user: UserPayload) {
  await connectDB();

  if (user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;

  const category = await Category.findById(id);
  if (!category) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  await Category.deleteMany({ parentCategory: category._id });
  await category.deleteOne();

  return NextResponse.json({ message: "Category deleted successfully" });
}

/* ================= EXPORT ROUTES ================= */
export const POST = withAuth(createCategory);
export const GET = getAllCategories;
export const PATCH = withAuth(updateCategory);
export const DELETE = withAuth(deleteCategory);
