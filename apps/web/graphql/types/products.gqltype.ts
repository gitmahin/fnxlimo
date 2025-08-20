import { productService } from "@/services";
import { extendType, intArg, objectType } from "nexus";

export const NAME_QUERY_PRODUCTS = "products";
export const NAME_QUERY_CATS_WITH_PRODUCTS = "categoriesWithProducts";

const ProductImages = objectType({
  name: "ProductImages",
  definition(t) {
    t.nonNull.string("src");
    t.string("alt");
    t.string("name");
    t.nonNull.string("date_created");
    t.string("date_modified");
  },
});

const ProductAttributes = objectType({
  name: "ProductAttributes",
  definition(t) {
    t.nonNull.string("name");
    t.list.string("options");
  },
});

const ProductBrands = objectType({
  name: "ProductBrand",
  definition(t) {
    t.nonNull.string("name");
    t.string("slug");
  },
});

export const Products = objectType({
  name: "Products",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("slug");
    t.nonNull.string("date_created");
    t.string("date_modified");
    t.string("status");
    t.string("price");
    t.string("regular_price");
    t.string("sale_price");
    t.string("total_sales");
    t.int("stock_quantity");
    t.boolean("in_stock");
    t.int("rating_count");
    t.string("average_rating");
    t.string("bags")
    t.string("peoples")
    t.string("lat")
    t.string("lng")
    t.list.field("images", {
      type: ProductImages,
    });
    t.list.field("attributes", {
      type: ProductAttributes,
    });
    t.list.field("brands", {
      type: ProductBrands,
    });
  },
});

export const CategoriesWithProducts = objectType({
  name: "CategoriesWithProducts",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("slug");
    t.int("count");
    t.list.field("products", {
      type: Products,
      async resolve(root) {
        const response = await productService.getProducts(root.id as number);
        return response.data;
      },
    });
  },
});

export const ProductsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field(NAME_QUERY_PRODUCTS, {
      type: Products,
      args: {
        categoryID: intArg(),
      },
      async resolve(_root, args: { categoryID?: number | null }) {
        const response = await productService.getProducts(
          args.categoryID as number
        );
        
        return response.data;
      },
    });
  },
});

export const GetCategoriesWithProducts = extendType({
  type: "Query",
  definition(t) {
    t.list.field(NAME_QUERY_CATS_WITH_PRODUCTS, {
      type: CategoriesWithProducts,
      async resolve() {
        const response = await productService.getProductsCategories();
        return response.data;
      },
    });
  },
});
