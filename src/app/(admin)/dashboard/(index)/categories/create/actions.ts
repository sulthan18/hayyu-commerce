"use server";

import { schemaCategory } from "@/lib/schema";
import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma";

export async function postCategory(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    const validate = schemaCategory.safeParse({
        name: formData.get("name"),
    });

    if (!validate.success) {
        return {
            error: validate.error.errors[0].message,
        };
    }

    try {
        await prisma.category.create({
            data: {
                name: validate.data.name,
            },
        });

        return { error: "" };
    } catch (error) {
        return {
            error: "Failed to save category. Please try again later.",
        };
    }
}

export async function updateCategory(
    _: unknown,
    formData: FormData,
    id: number | undefined
): Promise<ActionResult> {
    const validate = schemaCategory.safeParse({
        name: formData.get("name"),
    });

    if (!validate.success) {
        return {
            error: validate.error.errors[0].message,
        };
    }

    if (id === undefined) {
        return {
            error: "Id is not found",
        };
    }

    try {
        await prisma.category.update({
            where: { id: id },
            data: { name: validate.data.name },
        });

        return { error: "" };
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to update data",
        };
    }
}

export async function deleteCategory(
    _: unknown,
    formData: FormData,
    id: number
  ): Promise<ActionResult> {
    try {
      await prisma.category.delete({
        where: {
          id
        }
      });
      return { error: "" };
    } catch (error) {
      console.error(error);
      return {
        error: "Failed to delete data"
      };
    }
  }