import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/NewProduct";
import Variant from "@/models/NewVariant";
import slugify from "slugify";
import fs from "fs/promises";
import path from "path";

export const getProductBySlug = async (slug: string) => {
  if (!slug) return null;

  const product = await Product.findOne({ slug })
    .populate("categories")
    .populate("brand")
    .lean();

  let variants = [];
  if (product.isOnlyProduct && product.productData?.variants?.length > 0) {
    variants = product.productData.variants;
  } else {
    variants = await Variant.find({ productId: product._id }).lean();
  }
  return { ...product, variants };
};


export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { message: "Slug is required" },
      { status: 400 }
    );
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product, { status: 200 });
}
