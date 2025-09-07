import { ProductService } from "@/services";
import { extendType, intArg, objectType } from "nexus";

const productService = new ProductService();

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
export const AcfGoogleMap = objectType({
  name: "AcfGoogleMap",
  definition(t) {
    t.string("address");
    t.float("lat");
    t.float("lng");
    t.int("zoom");
    t.string("place_id");
    t.string("street_number");
    t.string("street_name");
    t.string("street_name_short");
    t.string("city");
    t.string("state");
    t.string("state_short");
    t.string("post_code");
    t.string("country");
    t.string("country_short");
  },
});

const CustomAcfFieldsData = objectType({
  name: "customACFFieldData",
  definition(t) {
    t.string("bags");
    t.string("peoples");
    t.field("location", {
      type: AcfGoogleMap,
    });
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
    t.field("custom_acf_fields", {
      type: CustomAcfFieldsData,
    });
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

const ProductCategoryImageType = objectType({
  name: "ProductCategoryImageType",
  definition(t) {
    t.string("src")
  },
})

export const ProductCategories = objectType({
  name: "ProductCategory",
  definition(t) {
    t.int("id")
    t.string("name")
    t.string("slug")
    t.string("description")
    t.field("image", {
      type: ProductCategoryImageType
    })
    t.string("count")
  },
})

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
    t.list.field("products", {
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

export const QueryProductCategories = extendType( {
  type: "Query",
  definition(t) {
    t.list.field("productCategories", {
      type: ProductCategories,
      async resolve() {
        const response = await productService.getProductsCategories();
        return response.data;
      }
    })
  },
})

export const GetCategoriesWithProducts = extendType({
  type: "Query",
  definition(t) {
    t.list.field("categoriesWithProducts", {
      type: CategoriesWithProducts,
      async resolve() {
        const response = await productService.getProductsCategories();
        return response.data;
      },
    });
  },
});
